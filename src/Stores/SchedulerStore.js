import {observable, computed, action} from "mobx";
import ResourceModel from "../Models/ResourceModel";
import DateModel from "../Models/DateModel";
import UiModel from "../Models/UiModel";

class SchedulerStore {
    resources = observable.array([]);
    @observable createEvent;
    date;
    ui; 
    editing;
    resizeEvent;
    stopResize;
    createEvent;
    startPaint;
    paintEvent;
    finishPaint;
    eventKeyGenerator;
    resourceKeyGenerator;
    disableMobileAdd;

    constructor( 
        init = {
            resources: [],
            events: [],

            editing: true,
            eventKeyGenerator: undefined,
            resourceKeyGenerator: undefined,
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
            hours: undefined,
            
            displayHeaders: false,
            rowHeight: undefined,
            headerHeight: undefined,
            createMethod: "add",

            disableMobileEdit: false
        } 
    ) {
        const {startTime, endTime, currentDay, hours,
            resources, editEvent, editing, events,
            stopResize, createEvent, deleteEvent, 
            startPaint, paintEvent, finishPaint,
            createMethod, eventKeyGenerator, resourceKeyGenerator,
            disableMobileEdit,
            ...ui
        } = init;

        this.date = new DateModel(startTime, endTime, currentDay, hours, this);
        this.resources.replace(resources.map(resource => {
            const hidden = resource.hidden || false;
            let resourceEvents = events.filter(event => event.resourceId === resource.id);
            return new ResourceModel(resource.id, resourceEvents, resource.componentProps, this, hidden)
        }));
        this.ui = new UiModel(ui, this);
        this.editing = editing;
        this.editEvent = editEvent;
        this.stopResize = stopResize;
        this.createEvent = createEvent;
        this.deleteEvent = deleteEvent
        this.startPaint = startPaint;
        this.paintEvent = paintEvent;
        this.finishPaint = finishPaint;
        this.createMethod = createMethod;
        this.eventKeyGenerator = eventKeyGenerator ? eventKeyGenerator : this.generateEventKey;
        this.resourceKeyGenerator = resourceKeyGenerator ? resourceKeyGenerator : this.generateResourceKey;
        this.disableMobileEdit = disableMobileEdit;
    }

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events )), []);
    }

    @computed get filteredResources() {
        return this.resources.filter(r => !r.hidden);
    }

    @computed get paint() {
        return this.createMethod === "paint";
    }

    @action updateEvents = (events) => {
        this.resources.forEach(resource => {
            resource.updateEvents(events.filter(e => e.resourceId === resource.id));
        });
    }

    @action replaceEvents = (events) => {
        this.resources.forEach(resource => {
            resource.replaceEvents(events.filter(e => e.resource.id === resource.id));
        });
    }

    @action toggleCreateMethod() {
        this.createMethod = (this.createMethod === "paint") ? "add" : "paint";
    }

    @action toggleEditing() {
        this.editing = !this.editing;
    }

    @action generateEventKey(event) {
        return "l" + event.layer + "-e" + event.id;
    }

    @action generateResourceKey(resource) {
        return "res" + resource.id;
    }
}

export default SchedulerStore;