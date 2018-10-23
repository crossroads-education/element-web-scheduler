import {observable, action} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore} from "../../../src/New";
import _ from "lodash";

class MasterScheduleStore {
    schedulerStore;

    constructor() {

    }
    
    init() {    
        const r = _.cloneDeep( MasterDemoData.resources );
        const e = _.cloneDeep( MasterDemoData.events );

        const schedule = new SchedulerStore( 
            r, e, 6, 
            18, "2017-12-17", 15,
            true, 3, 1,
            this.resizeEvent, this.stopResize
        );

        this.schedulerStore = schedule;
    }

    @action resizeEvent = (newTime, event, timeChanged) => {
        event[timeChanged] = newTime.format();
        event.componentProps[timeChanged] = newTime.format();
    }

    @action stopResize = () => {

    }
}

export default MasterScheduleStore
