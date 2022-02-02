export class ResponseDto {
    private _success?: boolean;
    private _message?: string;

    public get success() {
        return this._success;
    }

    public set success(success: boolean) {
        this._success = success;
    }
 
    public get message() {
        return this._message;
    }

    public set message(message: string) {
        this._message = message;
    }
}