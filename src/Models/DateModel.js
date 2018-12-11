import {observable, computed, action} from "mobx"
import Moment from "moment";
import {extendMoment} from "moment-range";
const moment = extendMoment(Moment);

class DateModel {
    @observable currentDay;
    @observable startTime;
    @observable endTime;
    @observable hours;
    schedule;
    
    constructor(startTime, endTime, currentDay, hours, schedule) {
        this.currentDay = currentDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hours = hours;
        this.schedule = schedule;
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
        const startToday = this.hours && this.hours[this.currentDay] ? this.hours[this.currentDay].start : this.startTime;
        return moment(startToday, "HH:mm:ss").day(this.currentDay);
    }

    @computed get end() {
        const endToday = this.hours && this.hours[this.currentDay] ? this.hours[this.currentDay].end : this.endTime;
        return moment(endToday, "HH:mm:ss").day(this.currentDay);
    }

    @computed.struct get range() {
        return moment.range([this.start, this.end]);
    }

    @computed get day() {
        return moment().day(this.currentDay).format("dddd");
    }

    @computed get dateChanged() {
        return moment().isSame(moment().day(this.currentDay), "day");
    }
}

export default DateModel;