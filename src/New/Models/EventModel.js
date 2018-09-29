import {observable, computed, action, runInAction} from "mobx"
import moment from "moment";


class EventModel {
    id;
    layer;
    schedule;
    component;
    resizeComponent;
    @observable start;
    @observable end;
    @observable resourceId;
    @observable resizable;
    @observable movable;
    @observable componentProps;
    @observable sizeDelta;

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
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventSpan = this.timespan(this.start, this.end);

        return ((eventSpan / daySpan) * 100);
    }

    @computed get left() {
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventStartOffset = this.timespan(this.schedule.start, this.start);

        return ((eventStartOffset / daySpan) * 100);
    }

    @computed get active() {
        return this.schedule.activeLayer === this.layer;
    }

    @action resize(delta, direction, parentWidth) {
 
        let incrementalDelta = delta - this.sizeDelta;

        this.sizeDelta = delta;

        const percentShift = incrementalDelta / parentWidth;

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

        runInAction(this.schedule.doResize(newTime,this,startOrEnd));
    }

    @action stopResize() {
        this.sizeDelta = 0;
    }
}

export default EventModel;