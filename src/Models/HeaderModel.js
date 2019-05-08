import {observable, computed} from "mobx"
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

class HeaderModel {
    @observable time;
    schedule;

    constructor({
        time, schedule, alignment
    }) {
        this.alignment = alignment;
        this.time = time;
        this.schedule = schedule;
    }

    timespan(start, end) {
        return moment(end).diff(moment(start), "minute");
    }

    @computed get left() {
        let daySpan = this.timespan(this.schedule.date.start, this.schedule.date.end);
        let eventStartOffset = this.timespan(this.schedule.date.start, this._time); // minutes after the schedule start 
        return ((eventStartOffset / daySpan) * 100 + "%");
    }

    @computed get _time() {
        return moment(this.time, "HH:mm:ss").day(this.schedule.date.start.day);
    }

    @computed get asString() {
        return this.time.format("ha").slice(0, -1);
    }
}

export default HeaderModel;