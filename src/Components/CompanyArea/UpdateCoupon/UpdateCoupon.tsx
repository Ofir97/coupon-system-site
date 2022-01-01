import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Coupon } from "../../../Models/Coupon";
import { ResponseDto } from "../../../Models/ResponseDto";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./UpdateCoupon.css";
import { useEffect, useState } from "react";
import { Category } from "../../../Models/Category";

function UpdateCoupon(): JSX.Element {

    const { id } = useParams();
    const navigate = useNavigate();

    const init: Coupon = undefined;
    const [coupon, setCoupon] = useState<Coupon>(init);

    const [category, setCategory] = useState('');

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

    const getCoupon = async () => {
        console.log(globals.urls.companyCoupons + '/' + id);
        return axios.get<Coupon>(globals.urls.companyCoupons + '/' + id);
    }

    useEffect(() => {
        getCoupon()
            .then((response) => {
                if (response.data.title === undefined) {
                    notify.error('coupon with id ' + id + ' does not exist')
                    navigate('/company');
                }
                else {
                    setCoupon(response.data);
                    setCategory(response.data.category.toString());
                }
            })
            .catch((err) => {
                notify.error(err);
            })
    }, [])


    const sendToRemoteServer = (coupon: Coupon) => {
        coupon.id = +id;
        axios.put<ResponseDto>(globals.urls.companyCoupons, coupon)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    navigate('/company/coupons');
                }
                else notify.error(response.data.message);
            })
            .catch((err) => {
                notify.error(err);
            })
    }


    return (
        <div className="UpdateCoupon">
            <h2>Update Coupon</h2>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated"  >
                <div className="form-group row">
                    <label className="col-4 col-form-label">Id</label>
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
                            <input {...register("title")} required type="text" className="form-control" defaultValue={coupon?.title}/>
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
                            <input {...register("startDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required defaultValue={coupon?.startDate?.toString()} />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.startDate?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">End Date</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("endDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required defaultValue={coupon?.endDate?.toString() || ''} />
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
                        <select {...register("category")} value={category} onChange={e => onSelectChange(e.target.value)} className="custom-select" required>
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
                    <div className="offset-4 col-8">
                        <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Update Coupon</button>
                    </div>
                </div>
            </form>

            <GoMenu to='/company' />
        </div>
    );
}

export default UpdateCoupon;

