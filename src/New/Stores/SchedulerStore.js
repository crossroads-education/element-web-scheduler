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
    @observable bodySize;

    constructor(resources, events, startTime, 
                endTime, currentDate, minuteStep, 
                resizeSnap, activeLayer, backgroundLayer,
                resizeEvent, stopResize, 
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
    }

    @action setBodySize = (ref) => {
        this.bodySize = ref.current.clientWidth;
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
        return this.end.diff(this.start, "hour") * (60 / this.minuteStep);
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

    @computed get events() {
       return this.resources.reduce((events, resource) => (events = events.concat(resource.events  )), []);
    }

}

export default SchedulerStore;