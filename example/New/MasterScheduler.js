import * as React from "react";
import Scheduler from "../../src/New/index";
import {observer}from "mobx-react";
import ResourceComponent from "./ResourceComponent";
import * as _ from "lodash";
import DevTools from "mobx-react-devtools";
import Datepicker from "./Datepicker"
import AdornmentComponent from "./AdornmentComponent";

@observer
export default class MasterScheduler extends React.Component {
    constructor(props) {
        super(props);

        this.props.MasterScheduleStore.init();
    }

    render() {
        const { MasterScheduleStore: Store } = this.props;
        return (
            <div style={{width: "100%",height: "100%"}}>
                <DevTools />
                <div style={{width: 1600,height: 800}}>
                    <Datepicker 
                        currentDate={Store.schedulerStore.currentDate} 
                        incrementDate={Store.schedulerStore.incrementDate}
                        decrementDate={Store.schedulerStore.decrementDate}
                    />
                    <Scheduler
                        schedulerStore={Store.schedulerStore}
                        resourceComponent={ResourceComponent}
                        adornmentComponent={AdornmentComponent}
                    />
                </div>
            </div>
        )
    }
}