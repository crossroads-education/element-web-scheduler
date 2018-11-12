import {observable, computed, action} from "mobx"
import Moment from "moment";
import {extendMoment} from "moment-range";
const moment = extendMoment(Moment);

class DateModel {
    @observable currentDay;
    @observable startTime;
    @observable endTime;
    schedule;
    
    constructor(startTime, endTime, currentDay) {
        this.currentDay = currentDay;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    @action setDay = day => {
        this.currentDay = day;
    }

    @action decrementDay = () => {
        this.setDay(moment().day(this.currentDay).subtract(1, "day").day());
    }

    @action incrementDay = () => {
        this.setDay(moment().day(this.currentDay).add(1, "day").day());
    }

    @computed get start() {
        return moment(this.startTime, "HH:mm:ss").day(this.currentDay);
    }

    @computed get end() {
        return moment(this.endTime, "HH:mm:ss").day(this.currentDay);
    }

    @computed.struct get range() {
        return moment.range([this.start, this.end]);
    }

    @computed get hours() {
        return this.end.diff(this.start, "hour");
    }

    @computed get day() {
        return moment().day(this.currentDay).format("dddd");
    }

    @computed get dateChanged() {
        return moment().isSame(moment().day(this.currentDay), "day");
    }
}

export default DateModel;