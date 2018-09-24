import {observable, computed, action} from "mobx"; 
import timespan from "./timespan";

export default class SchedulerState {
    @observable resources;
    constructor(init = {}) {
        Object.assign(this, init)
    };

    @action
    resizeEvent(event, direction, delta) => {
        
    }

}