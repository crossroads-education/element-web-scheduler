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
    @observable anchorElement;

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

    @computed get duration() {
        return this.timespan(this.start, this.end) / (60 * 60); 
    }

    @action startResize = (evt, position) => {
        return false;
    }

    @action drag = (evt, position) => {
        this.x = this.left;
        this.y = this.y;
    }

    @action resize = (evt, data, side) => {

        if (data.deltaX === 0) return;

        let newTime, timeChange = 0;

        if (this.deltaX == 0) this.deltaX = evt.clientX;

        const delta = evt.clientX - this.deltaX;

        const currentTime = moment(this[side]);

        if ( this.schedule.resizeSnap ) {
            if (Math.abs(delta) >= this.schedule.cellWidth * .5) { // this gives a more 'natural drag feel'
                // for an explanation of this line please see this issue on github https://github.com/crossroads-education/element-web-scheduler/issues/1
                this.deltaX = evt.clientX;
                timeChange = Math.sign(delta) * this.schedule.hoursStep
            }
        }

        newTime = currentTime.add(timeChange, "hours");

        this.schedule.resizeEvent(newTime, this, side);
    }

    @action togglePopover = target => {
        if ( this.layer === this.schedule.activeLayer ) {
            this.schedule.togglePopver(this);
            this.displayPopup = !this.displayPopup;
            this.anchorElement = this.displayPopup ? target : undefined;
        }
    }

    @action stopResize = () => {
        this.deltaX = 0;
    }

}

export default EventModel;