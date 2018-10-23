import * as React from "react";
import { PopoverWrapper } from "../../src/New/"

class Popover extends React.Component {
    render() {
        const {eventModel} = this.props;

        return (
            <div>
                <p> {eventModel.start} </p>
                <p> {eventModel.end} </p>
            </div>
        )
    }
}

export default PopoverWrapper(Popover);


