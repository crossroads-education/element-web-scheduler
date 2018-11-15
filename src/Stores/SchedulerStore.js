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

    constructor( 
        init = {
            resources: [], 
            events: [],
            
            renderLayers: {},
            renderResource: undefined,
            renderPopover: undefined,
            renderAdornment: undefined,
            renderAdornmentHeader: undefined,
            renderResourceHeader: undefined,

            activeLayer: undefined,
            backgroundLayer: undefined,

            editEvent: undefined,
            stopResize: undefined,
            createEvent: undefined,
            deleteEvent: undefined,

            startTime: "",
            endTime: "",
            currentDay: undefined,
            
            displayHeaders: false
        } 
    ) {
        this.date = new DateModel(init.startTime, init.endTime, init.currentDay);
        this.resources = init.resources.map(resource => {
            let resourceEvents = init.events.filter(event => event.resourceId === resource.id);
            return new ResourceModel(resource.id, resourceEvents, resource.componentProps, this)
        });
        this.ui = new UiModel(init.renderLayers, init.renderResource, this, 
                                init.activeLayer, init.backgroundLayer, 
                                init.renderPopover, init.renderAdornment, init.displayHeaders,
                                init.renderResourceHeader, init.renderAdornmentHeader
                            );
        this.editEvent = init.editEvent;
        this.stopResize = init.stopResize;
        this.createEvent = init.createEvent;
        this.deleteEvent = init.deleteEvent
    }

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events )), []);
    }

    @computed get cells() {
        const cells = Array.from(this.date.range.by("minute", {step: 30})).map(m => m.format("H:mm"));
        cells.shift();
        return cells;
    }

    

}

export default SchedulerStore;