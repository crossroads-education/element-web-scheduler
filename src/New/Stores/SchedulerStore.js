import {observable, computed} from "mobx"
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
    doResize;

    constructor(resources, events, startTime, endTime, currentDate, minuteStep, resizeSnap, activeLayer, backgroundLayer, doResize) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.currentDate = currentDate;
        this.minuteStep = minuteStep;
        this.resources = resources.map(resource => new ResourceModel(resource.id, events.filter(event => event.resourceId === resource.id), resource.componentProps, this));
        this.resizeSnap = resizeSnap;
        this.activeLayer = activeLayer;
        this.backgroundLayer = backgroundLayer;
        this.doResize = doResize;
        
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

}

export default SchedulerStore;