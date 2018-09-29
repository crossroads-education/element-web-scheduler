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
        return moment(end).diff(moment(start), "hours");
    }

    @computed({name: "width"}) get width() {
        console.log( "width" );
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventSpan = this.timespan(this.start, this.end);

        return ((eventSpan / daySpan) * 100) + "%";
    }

    @computed({name: "left"}) get left() {
        console.log("left");
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventStartOffset = this.timespan(this.schedule.start, this.start);

        return ((eventStartOffset / daySpan) * 100) + "%";
    }

    @computed({name: "active"}) get active() {
        return this.schedule.activeLayer === this.layer;
    }

    @action.bound resize(delta, direction, parentWidth) {       
        const incrementalDelta = delta - this.sizeDelta;
        const percentAdjusted = incrementalDelta/parentWidth;
        const percentTimeChange = percentAdjusted * (this.schedule.endTime - this.schedule.startTime)
        const changeTime = (direction === "left") ? "start" : "end";
        const newTime=moment( this[changeTime] ).add( percentTimeChange,"hour" );
        runInAction(() => {this.schedule.doResize( newTime.format( "YYYY-MM-DD hh:mm" ), this, changeTime)});
    }

    @action.bound stopResize() {
        this.sizeDelta = 0;
    }
}

export default EventModel;