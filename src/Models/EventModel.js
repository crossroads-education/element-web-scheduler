import {observable, computed, action} from "mobx"
import moment from "moment";


class EventModel {
    id;
    layer;
    schedule;
    resource;
    component;
    resizeComponent;
    deltaX;
    @observable sizeDelta;
    @observable start;
    @observable end;
    @observable day;    
    @observable resourceId;
    @observable resizable;
    @observable movable;
    @observable componentProps;
    @observable y;
    @observable displayPopup;
    @observable anchorElement;

    constructor({id, start, end, resourceId, componentProps, schedule, resource, layer, resizable, day} = {}) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.resourceId = resourceId;
        this.componentProps = componentProps;
        this.schedule = schedule;
        this.resource = resource;
        this.layer = layer;
        this.resizable = resizable;
        this.day = day;
        this.deltaX = 0;
        this.displayPopup = false;
    }

    timespan(start, end) {
        return moment(end).diff(moment(start), "second");
    }

    @computed get width() {
        let daySpan = this.timespan(this.schedule.date.start, this.schedule.date.end); // hours, minutes, seconds in one schedule period

        let eventSpan = this.timespan(this._start, this._end); // hours, minutes, seconds, in event time length

        return ((eventSpan / daySpan) * 100 + "%"); 
    }

    @computed get left() {
        let daySpan = this.timespan(this.schedule.date.start, this.schedule.date.end);
        let eventStartOffset = this.timespan(this.schedule.date.start, this._start); // hours, minutes, seconds time after 
        return ((eventStartOffset / daySpan) * this.schedule.ui.bodyWidth);
    }

    @computed get active() {
        return this.schedule.ui.activeLayer === this.layer;
    }

    @computed get _start() {
        return moment(this.start, "HH:mm:ss").day(this.day);
    }

    @computed get _end() {
        return moment(this.end, "HH:mm:ss").day(this.day);
    }

    @computed get duration() {
        return this.timespan(this._start, this._end) / (60 * 60); 
    }

    @computed get render() {
        return this.schedule.ui.renderLayers[this.layer].event;
    }

    @computed get resizer() {
        return this.schedule.ui.renderLayers[this.layer].resizer;
    }

    @computed get popover() {
        return this.schedule.ui.renderPopover;
    }

    @action startResize = (evt, position) => {
        return false;
    }

    @action drag = (evt, position) => {
        
    }

    @action resize = (evt, data, side) => {

        let error = false;

        if (data.deltaX === 0) return;

        this.deltaX += evt.movementX;

        if (Math.abs(this.deltaX) >= this.schedule.ui.moveWidth) { 

            let currentTime = this["_" + side].clone(); // get moment computed side

            const cells = Math.floor(Math.abs(this.deltaX) / this.schedule.ui.moveWidth);

            const timeChange = Math.sign(this.deltaX) * cells * .25 // one quarter hour

            this.deltaX = Math.sign(this.deltaX) * Math.abs(Math.abs(this.deltaX) % this.schedule.ui.moveWidth);

            const newTime = currentTime.add(timeChange, "hours");

            if (side === "start") {
                if(this._end.isSameOrBefore(newTime) || this.schedule.date.start.isAfter(newTime)) error = true;
            } else {
                if(this._start.isSameOrAfter(newTime) || this.schedule.date.end.isBefore(newTime)) error = true;
            }

            if(!error) this.schedule.resizeEvent(newTime, this, side);
        }
    }

    @action togglePopover = target => {
        if ( this.active ) {
            this.schedule.ui.togglePopover(this);
            this.displayPopup = !this.displayPopup;
            this.anchorElement = this.displayPopup ? target : undefined;
        }
    }

    @action stopResize = e => {
        this.deltaX = 0;
    }

    @action delete = () => {
        this.resource.deleteEvent(this);
    }

}

export default EventModel;