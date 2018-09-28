import * as React from "react";
import Scheduler from "../../src/New/index";
import {MasterDemoData} from "./MasterDemoData";
import ResourceComponent from "./ResourceComponent";
import * as _ from "lodash";
import DevTools from "mobx-react-devtools";

export default class MasterScheduler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resources: _.cloneDeep(MasterDemoData.resources),
            events: _.cloneDeep(MasterDemoData.events)
        }
    }

    resizeEvent = (newTime, event, timeChanged) => {
        event[timeChanged] = newTime;
        event.componentProps[timeChanged]=newTime;
    }

    render() {
        return (
            <div style={{width: "100%",height: "100%"}}>
                <DevTools />
                <div style={{width: 800,height: 400}}>
                    <Scheduler
                        resources={this.state.resources}
                        events={this.state.events}
                        resourceComponent={ResourceComponent}
                        startTime={6}
                        endTime={18}
                        currentDate={"2017-12-18"}
                        minuteStep={15}
                        backgroundLayer={1}
                        activeLayer={3}
                        resizeEvent={this.resizeEvent}
                    />
                </div>
            </div>
        )
    }
}