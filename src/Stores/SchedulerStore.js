import {observable, computed, action} from "mobx"
import Moment from "moment";
import {extendMoment} from "moment-range";
const moment = extendMoment(Moment);
import ResourceModel from "../Models/ResourceModel";

class SchedulerStore {
    @observable resources;
    @observable startTime; //hour, 0 is midnight, 23 is 11pm
    @observable endTime;
    @observable currentDate;
    @observable minuteStep;
    @observable resizeSnap;
    @observable activelayer;
    @observable backgroundLayer;
    @observable bodyWidth;
    @observable bodyHeight;
    @observable createEvent;
    renderPopover;
    openEvent;

    constructor(resources, events, startTime, 
                endTime, currentDate, minuteStep, 
                resizeSnap, activeLayer, backgroundLayer,
                resizeEvent, stopResize, createEvent,
                renderPopover
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.currentDate = currentDate;
        this.minuteStep = minuteStep;
        this.resources = resources.map(resource => {
            let resourceEvents = events.filter(event => event.resourceId === resource.id);
            return new ResourceModel(resource.id, resourceEvents, resource.componentProps, this)
        });
        this.resizeSnap = resizeSnap;
        this.activeLayer = activeLayer;
        this.backgroundLayer = backgroundLayer;
        this.resizeEvent = resizeEvent;
        this.stopResize = stopResize;
        this.createEvent = createEvent;
        this.renderPopover = renderPopover; 
    }

    @action setBodySize = (ref) => {
        this.bodyWidth = ref.current.clientWidth;
        this.bodyHeight = ref.current.clientHeight;
    }

    @action setDate = date => {
        this.currentDate = date;
    }

    @action decrementDate = () => {
        this.setDate(moment(this.currentDate).subtract(1, "day").format());
    }

    @action incrementDate = () => {
        this.setDate(moment(this.currentDate).add(1, "day").format());
    }

    @computed get start() {
        return moment( this.currentDate ).hours(this.startTime)
    }

    @computed get end() {
        return moment( this.currentDate ).hours(this.endTime);  
    }

    @computed get range() {
        return moment.range([this.start, this.end]);
    }

    @computed get cells() {
        return this.end.diff(this.start, "hour") * (60 / 30);
    }

    @computed get hours() {
        return this.start - this.end
    }

    @computed get cellWidth() {
        return this.bodyWidth / this.cells;
    }

    @computed get headers() {
        const hours = this.endTime - this.startTime;
        const headers = [];
        const start = this.start;
        for (i = 0; i < hours; i++) {
            headers.push(start.add(i, "hour"));
        }

        return headers;
    }

    @computed get hoursStep() {
        return this.minuteStep / 60;
    }

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events )), []);
    }

    getResizeTime(delta) {
        return (delta / this.bodyWidth) * this.hours;
    }

    togglePopver(event) {
        if (!this.openEvent) {
            console.log(event);
            this.openEvent = event;
        } else {
            if (this.openEvent.id === event.id) {
                this.openEvent = undefined;
            } else {
                this.openEvent.togglePopver();
                this.openEvent = event;
            }
        }
    }
}

export default SchedulerStore;