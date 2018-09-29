import {observable,computed} from "mobx"
import EventModel from "./EventModel";
import Moment from "moment";
import {extendMoment} from "moment-range";
const moment=extendMoment( Moment );

class ResourceModel {
    @observable events;
    @observable componentProps;
    schedule;
    id;

    constructor(id, events, componentProps, schedule) {
        this.schedule = schedule;
        this.id = id;
        this.componentProps = componentProps;
        this.events = events.map(event => new EventModel(
            event.id, 
            this.schedule, 
            event.layer, 
            event.start, 
            event.end, 
            event.resourceId, 
            event.component, 
            event.resizeComponent, 
            event.componentProps,
            event.resizable, 
            event.movable
        ));
    } 

    @computed get todaysEvents() {
        const range = this.schedule.range;
        return this.events.filter(event => range.contains(moment(event.end)) || range.contains(moment(event.start)));
    }

}

export default ResourceModel;