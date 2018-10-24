import {observable,computed, action} from "mobx"
import EventModel from "./EventModel";

class ResourceModel {
    @observable componentProps;
    events;
    schedule;
    id;

    constructor(id, events, componentProps, schedule) {
        this.schedule = schedule;
        this.id = id;
        this.componentProps = componentProps;
        
        this.events = events.map(event => 
            new EventModel(
                event.id, event.start, event.end, 
                event.resourceId, event.componentProps, schedule, 
                event.layer, event.resizable, event.day,
            )
        );
    } 

    @computed get todaysEvents() {
        const range = this.schedule.date.range;
        return this.events.filter(event => range.contains(event._start) || range.contains(event._end));
    }

    @action createEvent() {
        
    }

}

export default ResourceModel;