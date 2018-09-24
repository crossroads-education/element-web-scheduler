import {observable, computed} from "mobx"; 
import timespan from "./timespan";

export default class EventState {
    @observable start;
    @observable end;
    @observable resourceId;
    @observable layer;
    dayStart;
    dayEnd;

    constructor(init = {}) {
        Object.assign(this, init);
    }


    get duration() {
        return timespan(this.start, this.end);
    }

    @computed
    get width() {
        return this.duration() / timespan(dayStart, dayEnd);
    }

    @computed
    get left() {
        return timespan(this.start, this.dayStart) / timespan(this.dayStart, this.dayEnd);
    }
}