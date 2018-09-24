import * as React from "react";
import Scheduler from "../../src/New/Scheduler";
import {MasterDemoData} from "./MasterDemoData";
import ResourceComponent from "./ResourceComponent";
import * as _ from "lodash";

export default class MasterScheduler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resources: _.cloneDeep(MasterDemoData.resources)
        }
    }

    resizeEvent = newEvent => {
        const resourceIndex = _.findIndex(this.state.resources, resource => _.find(resource.events, event => event.id === newEvent.id));

        const eventIndex = _.findIndex(this.state.resources[resourceIndex].events, event => event.id === newEvent.id);

        
    }

    render() {
        return (
            <div style={{width: "100%",height: "100%"}}>
                <div style={{width: 800,height: 400}}>
                    <Scheduler
                        resources={this.state.resources}
                        resourceComponent={ResourceComponent}
                        start="2017-12-18 06:00:00"
                        end="2017-12-18 18:00:00"
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