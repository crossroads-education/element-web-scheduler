import {observable, computed, action, runInAction} from "mobx"
import moment from "moment";


class EventModel {
    id;
    layer;
    schedule;
    component;
    resizeComponent;
    sizeDelta;
    @observable start;
    @observable end;
    @observable resourceId;
    @observable resizable;
    @observable movable;
    @observable componentProps;
    

    constructor(id, schedule, layer, start, end, resourceId, component, resizeComponent, componentProps, resizable, movable) {
        this.id = id;
        this.layer = layer;
        this.start = start;
        this.end = end;
        this.resourceId = resourceId;
        this.resizeComponent = resizeComponent;
        this.component = component;
        this.resizeComponent 
        this.componentProps = componentProps;
        this.resizable = resizable;
        this.movable = movable;
        this.schedule = schedule;
        this.sizeDelta = 0;
    }

    timespan(start, end) {
        return moment(end).diff(moment(start), "second");
    }

    @computed get width() {
        let daySpan = this.timespan(this.schedule.start, this.schedule.end); // hours, minutes, seconds in one schedule period

        let eventSpan = this.timespan(this.start, this.end); // hours, minutes, seconds, in event time length

        return ((eventSpan / daySpan) * 100); 
    }

    @computed get left() {
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventStartOffset = this.timespan(this.schedule.start, this.start); // hours, minutes, seconds time after 

        return ((eventStartOffset / daySpan) * 100);
    }

    @computed get active() {
        return this.schedule.activeLayer === this.layer;
    }

    @action resize(delta, direction) {

        let incrementalDelta = delta - this.sizeDelta;

        this.sizeDelta = delta;

        const percentShift = incrementalDelta / this.schedule.bodySize;

        const hours = this.schedule.endTime - this.schedule.startTime;
    
        const timeChange = percentShift * hours;

        const startOrEnd = (direction === "right") ? "end" : "start";

        const oldTime = moment(this[startOrEnd]);

        let newTime;

        if (startOrEnd === "end") {
            newTime = oldTime.add(timeChange, "hours");
        } else {
            newTime = oldTime.subtract(timeChange, "hours");
        }

        if(this.schedule.resizeSnap) {
            if(newTime.minutes() % this.schedule.minuteStep) { // if it didn't snap
                const corrected = Math.round(newTime.minutes() / this.schedule.minuteStep) * this.schedule.minuteStep;
                newTime.minutes(corrected).seconds(0);    
            }
        }

        this.schedule.resizeEvent(newTime, this, startOrEnd);
    }

    @action stopResize() {
        this.sizeDelta = 0;
    }

    @computed get resizeAmount() {
        return (this.schedule.resizeSnap) ? (this.schedule.bodySize / this.schedule.cells) : 1;
    }
}

export default EventModel;