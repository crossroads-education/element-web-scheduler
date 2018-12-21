import {observable,computed, action} from "mobx"
import EventModel from "./EventModel";
import * as _ from "lodash";

class ResourceModel {
    @observable componentProps;
    @observable events;
    @observable paintedEvent; // Event that is being painted
    @observable paintInitialX; // X-position where drag started
    @observable paintSide; // Direction of painting
    schedule;
    id;

    constructor(id, events, componentProps, schedule) {
        this.schedule = schedule;
        this.id = id;
        this.componentProps = componentProps;
        
        this.events = events.map(event => 
            new EventModel({
                id: event.id,
                start: event.start,
                end: event.end, 
                resourceId: event.resourceId,
                componentProps: event.componentProps,
                schedule, 
                resource: this,
                layer: event.layer,
                resizable: event.resizable,
                day: event.day,
            })
        );
    }

    @action updateEvents = (newEvents) => {
        this.events.replace(newEvents.map(event => 
            new EventModel({
                id: event.id,
                start: event.start,
                end: event.end,
                resourceId: event.resourceId,
                componentProps: event.componentProps,
                schedule: this.schedule,
                resource: this,
                layer: event.layer,
                resizable: event.resizable,
                day: event.day,
            })
        ));
    }

    @action replaceEvents = (events) => {
        this.events.replace(events);
    }

    @computed get todaysEvents() {
        const range = this.schedule.date.range;
        return this.events.filter(event => range.contains(event._start) || range.contains(event._end));
    }

    @action createEvent = startPosition => {
        if (this.schedule.editing) {
            const startTime = Math.floor(startPosition / this.schedule.ui.halfCellWidth) * 0.25;
            this.schedule.createEvent(this.initNewEvent(), this, startTime);
        }
    }

    @action initNewEvent = (id) => {   
        const newId = id ? id : (new Date()).getTime();

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
        if (this.schedule.editing) {
            const startHour = Math.floor(data.x / this.schedule.ui.halfCellWidth) * 0.25;
            this.paintedEvent = this.schedule.startPaint(this.initNewEvent(), startHour);
            this.paintInitialX = data.x;
            this.paintSide = "end";
        }
    }

    @action doPaint = (mouseEvent, data) => {
        if (this.schedule.editing) {
            // Only compute changed time if mouse moved
            if (data.deltaX !== 0) {
                // Check if dragging direction swapped
                const side = data.x > this.paintInitialX ? "end" : "start";
                if (side !== this.paintSide) {
                    this.paintSide = side;
                }
                const newTime = this.paintedEvent.resize(mouseEvent, data, side);
                if (newTime && newTime.isSameOrBefore(this.schedule.date.end) && newTime.isSameOrAfter(this.schedule.date.start)) {
                    this.schedule.paintEvent(newTime, this.paintedEvent, side);
                }
            }
        }
    }

    @action finishPaint = () => {
        if (this.schedule.editing) {
            this.schedule.finishPaint(this, this.paintedEvent);
            this.cleanUpPaint();
        }
    }

    @action cleanUpPaint = () => {
        this.paintedEvent = undefined;
        this.paintSide = undefined;
        this.paintEventX = 0;
    }

    @action deleteEvent = event => {
        const index = this.events.findIndex((evt) => {
            return _.isEqual(event, evt);
        });
        this.schedule.deleteEvent(event, this, index);
    }

    @action addEvent = event => {
        this.events.replace([...this.events, event]);
    }

}

export default ResourceModel;