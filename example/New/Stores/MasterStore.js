import {observable, action} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore} from "../../../src/New";

class MasterScheduleStore {
    schedulerStore;

    constructor() {

    }
    
    init() {    
        const r = _.cloneDeep( MasterDemoData.resources );
        const e = _.cloneDeep( MasterDemoData.events );

        const schedule = new SchedulerStore( 
            r, e, 6, 
            18, "2017-12-18", 30,
            true, 3, 1,
            this.resizeEvent, this.stopResize
        );

        this.schedulerStore = schedule;
    }

    @action resizeEvent = (newTime, event, timeChanged) => {
        event[timeChanged] = newTime;
        event.componentProps[timeChanged] = newTime;
    }

    @action stopResize = () => {

    }
}

export default MasterScheduleStore
