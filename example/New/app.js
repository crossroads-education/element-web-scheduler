import * as React from "react";
import * as ReactDOM from "react-dom";
import Scheduler from "../../src/New/Scheduler";
import {MasterDemoData} from "./MasterDemoData";
import ResourceComponent from "./ResourceComponent";


ReactDOM.render((
    <div style={{width: "100%", height: "100%"}}>
        <div style={{width: 800, height: 400}}>
            <Scheduler
                events={MasterDemoData.events}
                resources={MasterDemoData.resources}
                resourceComponent={ResourceComponent}
                start="2017-12-18 06:00:00"
                end="2017-12-18 18:00:00"
                minuteStep={15}
                backgroundLayer={1}
            />
        </div>
    </div>
), document.getElementById('root'))