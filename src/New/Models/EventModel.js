import {observable, computed, action, runInAction} from "mobx"
import moment, {months} from "moment";


class EventModel {
    id;
    layer;
    schedule;
    component;
    resizeComponent;
    deltaX;
    @observable sizeDelta;
    @observable start;
    @observable end;
    @observable resourceId;
    @observable resizable;
    @observable movable;
    @observable componentProps;
    @observable y;
    @observable displayPopup;
    

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
        this.y = 0; 
        this.deltaX = 0; 
        this.displayPopup = false;
        
    }

    timespan(start, end) {
        return moment(end).diff(moment(start), "second");
    }

    @computed get width() {
        let daySpan = this.timespan(this.schedule.start, this.schedule.end); // hours, minutes, seconds in one schedule period

        let eventSpan = this.timespan(this.start, this.end); // hours, minutes, seconds, in event time length

        return ((eventSpan / daySpan) * 100 + "%"); 
    }

    @computed get left() {
        let daySpan = this.timespan(this.schedule.start, this.schedule.end);

        let eventStartOffset = this.timespan(this.schedule.start, this.start); // hours, minutes, seconds time after 

        return ((eventStartOffset / daySpan) * this.schedule.bodyWidth) ;
    }

    @computed get active() {
        return this.schedule.activeLayer === this.layer;
    }

    @action startDrag = (evt, position) => {
        return false;
    }

    @action drag = (evt, position) => {
        this.x = this.left;
        this.y = this.y;
    }

    @action resize = (evt, data, side) => {

        if (data.deltaX === 0) return;

        let newTime, timeChange = 0;

        this.deltaX += data.deltaX

        const currentTime = moment(this[side]);

        if ( this.schedule.resizeSnap ) {

            if (Math.abs(this.deltaX) >= this.schedule.cellWidth * .8) { // this gives a more 'natural drag feel'
                // for an explanation of this line please see this issue on github https://github.com/crossroads-education/element-web-scheduler/issues/1
                this.deltaX = (side === "start") ? this.deltaX % this.schedule.cellWidth : 0;
                timeChange = Math.sign(data.deltaX) * this.schedule.hoursStep
            }
        }

        newTime = currentTime.add(timeChange, "hours");

        this.schedule.resizeEvent(newTime, this, side);
    }

    @action toggleOpen = () => {
        this.displayPopup = !this.displayPopup;
    }

    @action stopResize = () => {
        this.deltaX  = 0;
    }

    @computed get resizeAmount() {
        return (this.schedule.resizeSnap) ? (this.schedule.bodySize / this.schedule.cells) : 1;
    }
}

export default EventModel;