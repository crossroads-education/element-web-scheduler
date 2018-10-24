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

    @action decrementDate = () => {
        this.setDay(this.currentDay - 1);
    }

    @action incrementDate = () => {
        this.setDay(this.currentDay + 1);
    }

    @computed get start() {
        return moment(this.startTime, "HH:mm:ss").day(this.currentDay);
    }

    @computed get end() {
        return moment(this.endTime, "HH:mm:ss").day(this.currentDay);
    }

    @computed get range() {
        return moment.range([this.start, this.end]);
    }

    @computed get hours() {
        return this.end.diff(this.start, "hour");
    }
}

export default DateModel;