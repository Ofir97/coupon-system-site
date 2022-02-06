import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { Coupon } from "../../../Models/Coupon";
import { ResponseDto } from "../../../Models/dto/ResponseDto";
import globals from "../../../Services/Globals";
import notify, { ErrMsg } from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./UpdateCoupon.css";
import { useEffect, useState } from "react";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import store from "../../../Redux/Store";
import { Utils } from "../../../Services/Utils";
import tokenAxios from "../../../Services/InterceptorAxios";
import { companyCouponsUpdatedAction } from "../../../Redux/CompanyCouponsAppState";

function UpdateCoupon(): JSX.Element {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const stateArr = location.state as Coupon[];
    const coupon = stateArr && stateArr[0];
    const [category, setCategory] = useState(coupon?.category);

    useEffect(() => {
        if (!store.getState().authState?.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
            return;
        }

        if (store.getState().authState?.user?.clientType.toString() !== 'COMPANY') {
            notify.error(ErrMsg.UNAUTHORIZED);
            navigate('/');
            return;
        }
    })

    const onSelectChange = (value: any) => {
        setCategory(value);
    }

    const schema = z.object({
        id: z.number(),
        title: z.string().nonempty("Please choose a title."),
        description: z.string().nonempty("Please provide a description."),
        startDate: z.date(),
        endDate: z.date(),
        amount: z.number().min(0, 'Amount must be greater than 0.').max(10000, 'Amount must be less than 10000.').int('Amount must be a whole number.'),
        price: z.number().min(0, 'Price must be greater than 0.').max(100000, 'Price must be less than 100000.'),
        image: z.string().nonempty("Please provide an image url."),
        category: z.string().nonempty('Please choose a category.'),

    }).partial()
        .refine(({ startDate }) => startDate !== undefined, { path: ["startDate"], message: "Start Date is required." })
        .refine(({ endDate }) => endDate !== undefined, { path: ["endDate"], message: "End Date is required." })
        .refine(({ startDate, endDate }) => startDate <= endDate, { path: ["endDate"], message: 'Start date must be earlier than End date.' })
        .refine(({ amount }) => amount !== undefined, { path: ["amount"], message: "Please provide a valid amount." })
        .refine(({ price }) => price !== undefined, { path: ["price"], message: "Please provide a valid price." })

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Coupon>({
        mode: "all",
        resolver: zodResolver(schema),
    });

    const sendToRemoteServer = (coupon: Coupon) => {
        coupon.id = +id;

        tokenAxios.put<ResponseDto>(globals.urls.companyCoupons, coupon)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(companyCouponsUpdatedAction(coupon));
                    navigate('/company/coupons');
                }
            })
            .catch((err) => {
                switch (err.response?.status) {
                    case 401: // unauthorized
                        notify.error(ErrMsg.UNAUTHORIZED_OPERATION);
                        break;
                    case 403: // forbidden
                        notify.error(err.response.data);
                        break;
                    default:
                        notify.error(err);
                }
            })
    }


    return (
        <div className="UpdateCoupon">
            {coupon !== null && <><h3 className="display-6">Update Coupon</h3>
                <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated"  >
                    <div className="form-group row">
                        <label className="col-4 col-form-label">ID</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("id")} disabled type="text" className="form-control" defaultValue={id} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Title</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("title")} required type="text" className="form-control" defaultValue={coupon?.title} />
                                <div className="invalid-feedback"></div>
                                <span className="bad">{errors.title?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Description</label>
                        <div className="col-8">
                            <textarea {...register("description")} cols={40} rows={3} className="form-control" required aria-describedby="HelpBlock" defaultValue={coupon?.description}></textarea>
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.description?.message}</span>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Start Date</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("startDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required defaultValue={Utils.convertUTCToDate(new Date(coupon?.startDate))} />
                                <div className="invalid-feedback"></div>
                                <span className="bad">{errors.startDate?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">End Date</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("endDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required defaultValue={Utils.convertUTCToDate(new Date(coupon?.endDate))} />
                                <div className="invalid-feedback"></div>

                            </div>
                            <span className="bad">{errors.endDate?.message}</span>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Amount</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("amount", {
                                    setValueAs: (v) => v === "" ? undefined : parseFloat(v)
                                })} type="number" className="form-control" required defaultValue={coupon?.amount} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <span className="bad">{errors.amount?.message}</span>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-4 col-form-label">Price</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("price", {
                                    setValueAs: (v) => v === "" ? undefined : parseFloat(v)
                                })} type="number" step="any" className='form-control' required defaultValue={coupon?.price?.toString()} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <span className="bad">{errors.price?.message}</span>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Image</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("image")} type="text" required className="form-control" defaultValue={coupon?.image || ''} />
                                <div className="invalid-feedback"></div>
                                <span className="bad">{errors.image?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Category</label>
                        <div className="col-8">
                            <select {...register("category")} value={category} onChange={e => onSelectChange(e.target.value)} className="form-select" required>
                                <option value="" disabled>Choose Category</option>
                                <option value="FOOD">Food</option>
                                <option value="ELECTRICITY">Electricity</option>
                                <option value="RESTAURANT">Restaurant</option>
                                <option value="VACATION">Vacation</option>
                                <option value="SPA">Spa</option>
                                <option value="TECHNOLOGY">Technology</option>
                            </select>
                            <div className="bad">{errors.category?.message}</div>
                        </div>

                    </div>


                    <div className="form-group row">
                        <div className="btn-container">
                            <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Update Coupon</button>
                        </div>
                    </div>
                </form>

                <GoMenu to='/company' />
            </>}

            {!coupon && <><EmptyView message='Ooops.. coupon does not exist!' />
                <Link to="/company/coupons"><button type="button" className="btn btn-secondary btn-md back-btn">Back to coupons menu</button></Link></>}

        </div>

    );
}

export default UpdateCoupon;

