import {observable,computed, action} from "mobx"
import EventModel from "./EventModel";
import {ENETDOWN} from "constants";

class ResourceModel {
    @observable componentProps;
    @observable events;
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
            day: this.schedule.date.currentDay
        }

        this.schedule.createEvent(newEvent, this, startTime);
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