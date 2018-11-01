import * as React from "react";
import { PopoverWrapper } from "../src/"

class Popover extends React.Component {

    deleteEvent = () => {
        this.props.eventModel.delete();
    }

    render() {
        const {eventModel} = this.props;

        return (
            <div>
                <p> {eventModel.start} </p>
                <p> {eventModel.end} </p>
                <button onClick={this.deleteEvent}> delete </button>
            </div>
        )
    }
}

export default PopoverWrapper(Popover);


