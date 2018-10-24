import {observable, computed, action} from "mobx";
import ResourceModel from "../Models/ResourceModel";
import DateModel from "../Models/DateModel";
import UiModel from "../Models/UiModel";

class SchedulerStore {
    @observable resources;
    date;
    ui; 
    resizeEvent;
    stopResize;
    createEvent;

    constructor( init = {} ) {
        this.date = new DateModel(init.startTime, init.endTime, init.currentDay);
        this.resources = init.resources.map(resource => {
            let resourceEvents = init.events.filter(event => event.resourceId === resource.id);
            return new ResourceModel(resource.id, resourceEvents, resource.componentProps, this)
        });
        this.ui = new UiModel(init.renderLayers, init.renderResource, this, 
                                    init.activeLayer, init.backgroundLayer, init.renderPopover, init.renderAdornment);
        this.resizeEvent = init.resizeEvent;
        this.stopResize = init.stopResize;
        this.createEvent = init.createEvent;
    }

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events )), []);
    }

     @computed get cells() {
        return this.date.hours * (60 / 30);
    }

    
}

export default SchedulerStore;