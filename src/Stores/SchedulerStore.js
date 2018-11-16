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

            startPaint: undefined,
            paintEvent: undefined,
            finishPaint: undefined,

            startTime: "",
            endTime: "",
            currentDay: undefined,
            
            displayHeaders: false,
            rowHeight: undefined,
            headerHeight: undefined
        } 
    ) {
        const {startTime, endTime, currentDay, 
            resources, editEvent, events,
            stopResize, createEvent, deleteEvent, 
            startPaint, paintEvent, finishPaint,
            ...ui
        } = init;

        this.date = new DateModel(startTime, endTime, currentDay, this);
        this.resources = resources.map(resource => {
            let resourceEvents = events.filter(event => event.resourceId === resource.id);
            return new ResourceModel(resource.id, resourceEvents, resource.componentProps, this)
        });
        this.ui = new UiModel(ui, this);
        this.editEvent = editEvent;
        this.stopResize = stopResize;
        this.createEvent = createEvent;
        this.deleteEvent = deleteEvent
        this.startPaint = startPaint;
        this.paintEvent = paintEvent;
        this.finishPaint = finishPaint;
    }

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events )), []);
    }
}

export default SchedulerStore;