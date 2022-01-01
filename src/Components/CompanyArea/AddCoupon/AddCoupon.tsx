import { Coupon } from "../../../Models/Coupon";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "./AddCoupon.css";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import { ResponseDto } from "../../../Models/ResponseDto";
import { useNavigate } from "react-router-dom";

function AddCoupon(): JSX.Element {

    const navigate = useNavigate();

    const schema = z.object({

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
        resolver: zodResolver(schema)
    });


    const sendToRemoteServer = async (coupon: Coupon) => {
        axios.post<ResponseDto>(globals.urls.companyCoupons, coupon)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    navigate('/company');
                }
                else notify.error(response.data.message);
            })
            .catch((err) => {
                notify.error(err);
            })
    }

    return (
        <div className="AddCoupon">
            <h2>Add Coupon</h2>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate >
                <div className="form-group row">
                    <label className="col-4 col-form-label">Title</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("title")} placeholder="enter coupon title" required type="text" className="form-control" />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.title?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Description</label>
                    <div className="col-8">
                        <textarea {...register("description")} cols={40} rows={3} className="form-control" required aria-describedby="HelpBlock"></textarea>
                        <div className="invalid-feedback"></div>
                        <span className="bad">{errors.description?.message}</span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Start Date</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("startDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.startDate?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">End Date</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("endDate", { setValueAs: (v) => v === "" ? undefined : new Date(v) })} type="date" className="form-control" required />
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
                            })} placeholder="enter amount" type="number" className="form-control" required />
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
                            })} placeholder="enter price" type="number" step="any" className='form-control' required />
                            <div className="invalid-feedback"></div>
                        </div>
                        <span className="bad">{errors.price?.message}</span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Image</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("image")} placeholder="enter image url" type="text" required className="form-control" />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.image?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Category</label>
                    <div className="col-8">
                        <select {...register("category")} defaultValue={''} className="custom-select" required>
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
                        <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Add Coupon</button>
                    </div>
                </div>
            </form>

            <GoMenu to='/company' />
        </div>
    );
}

export default AddCoupon;
