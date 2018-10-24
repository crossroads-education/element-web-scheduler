import * as ReactDOM from "react-dom";
import * as React from "react";
import Master from "./MasterScheduler";
import MasterStore from "./Stores/MasterStore"

ReactDOM.render((
    <Master MasterScheduleStore={new MasterStore()} />
), document.getElementById('root'))