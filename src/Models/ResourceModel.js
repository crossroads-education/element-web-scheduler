import {observable,computed, action} from "mobx"
import EventModel from "./EventModel";

class ResourceModel {
    @observable componentProps;
    @observable events;
    @observable paintedEvent; // an event while it is being "painted" before it's actual creation
    @observable paintEventX;
    @observable paintSide;
    schedule;
    id;

    constructor(id, events, componentProps, schedule) {
        this.schedule = schedule;
        this.id = id;
        this.componentProps = componentProps;
        
        this.events = events.map(event => 
            new EventModel({
                id: event.id, start: event.start, end: event.end, 
                resourceId: event.resourceId, componentProps: event.componentProps, schedule, 
                resource: this, layer: event.layer, resizable: event.resizable, day: event.day,
            })
        );
    } 

    @computed get todaysEvents() {
        const range = this.schedule.date.range;
        return this.events.filter(event => range.contains(event._start) || range.contains(event._end));
    }

    @action createEvent = startPosition => {
        let startTime = Math.round(((startPosition / this.schedule.ui.eventRowWidth) * this.schedule.date.hours) * 2) / 2;
        this.schedule.createEvent(this.initNewEvent(), this, startTime);
    }

    initNewEvent = () => {   
        const newId = this.schedule.events.reduce((highestId, event) => {
            if (event.id > highestId) highestId = event.id;
            return highestId
        }, 0) + 1;

        const newEvent = {
            id: newId,
            resourceId: this.id,
            schedule: this.schedule,
            resource: this,
            layer: this.schedule.ui.activeLayer,
            day: this.schedule.date.currentDay,
        }

        return newEvent;
    }

    @action startPaint = (mouseEvent, data) => {
        let startTime = Math.round(((data.x / this.schedule.ui.eventRowWidth) * this.schedule.date.hours) * 2) / 2;
        this.paintedEvent = this.schedule.startPaint(this.initNewEvent(), startTime);
        this.paintEventX = mouseEvent.clientX;
        this.paintSide = "end";
    }

    @action doPaint = (mouseEvent, data) => {
        
        const side = (this.paintEventX < mouseEvent.clientX) ? "end" : "start";
        
        const newTime = this.paintedEvent.resize(mouseEvent, data, side);

        if ( side !== this.paintSide ) {
            this.paintedEvent.flip();
            this.paintSide = side;
        }

        if (newTime && newTime.isSameOrBefore(this.schedule.date.end) && newTime.isSameOrAfter(this.schedule.date.start)) {
            this.schedule.paintEvent(newTime, this.paintedEvent, side);
        }
    }

    @action finishPaint = () => {
        this.schedule.finishPaint(this, this.paintedEvent);
        this.cleanUpPaint();
    }

    @action cleanUpPaint = () => {
        this.paintedEvent = undefined;
        this.paintSide = undefined;
        this.paintEventX = 0;
    }

    @action deleteEvent = event => {
        const index = this.events.findIndex((evt) => {
            return event.id === evt.id; 
        })

        this.schedule.deleteEvent(event, this, index);
    }

    @action addEvent = event => {
        this.events.replace([...this.events, event]);
    }

}

export default ResourceModel;