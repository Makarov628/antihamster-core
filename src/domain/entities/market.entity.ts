import Timeframe from "../enums/timeframe.enum";

class Market {

    public get id(): string {
        return this._id == '' ? `${this.ticker}_${this.timeframe}` : this._id;
    }

    public get ticker(): string {
        return this._ticker;
    }
    public set ticker(value: string) {
        this._ticker = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get timeframe(): Timeframe {
        return this._timeframe;
    }
    public set timeframe(value: Timeframe) {
        this._timeframe = value;
    }

    constructor(
        private _id: string,
        private _ticker: string,
        private _name: string,
        private _timeframe: Timeframe
    ) {}


}

export default Market;