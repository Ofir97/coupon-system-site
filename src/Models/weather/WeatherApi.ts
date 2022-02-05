export class WeatherApi {

    private _location?: String;
    private _temp?: Number;
    private _cloudCover?: Number;
    public _humidity?: Number;
    public _iconUrl?: String;
    public _description?: String;
    public _lat?: Number;

    public get location() {
        return this._location;
    }

    public set location(location: String) {
        this._location = location
    }

    public get temp() {
        return this._temp;
    }

    public set temp(temp: Number) {
        this._temp = temp
    }

    public get cloudCover() {
        return this._cloudCover;
    }

    public set cloudCover(cloudCover: Number) {
        this._cloudCover = cloudCover
    }

    public get humidity() {
        return this._humidity;
    }

    public set humidity(humidity: Number) {
        this._humidity = humidity
    }

    public get iconUrl() {
        return this._iconUrl;
    }

    public set iconUrl(iconUrl: String) {
        this._iconUrl = iconUrl
    }

    public get description() {
        return this._description;
    }

    public set description(description: String) {
        this._description = description
    }

    public get lat() {
        return this._lat;
    }

    public set lat(lat: Number) {
        this._lat = lat
    }
}   