import { Notyf } from 'notyf'

export enum SccMsg {
    ADDED_COUPON = 'Coupon added successfully',

}
export enum ErrMsg {

}
class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "right", y: "top" }, ripple: true, dismissible: true});

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string {
        if (typeof err === 'string') {
            return err;
        }

        if (typeof err?.response?.data === 'string') { //Backend exact error
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact error list
            return err?.response?.data[0];
        }

        if (typeof err?.message === 'string') {
            return err.message;
        }


        return "Miaouuuu, an error occurred, please try again.";
    }
}

const notify = new Notify();
export default notify;