import * as React from "react";
import {observer} from "mobx-react";
import Popover from "@material-ui/core/Popover";

function PopoverWrapper(WrappedComponent) {

    @observer
    class EventPopover extends React.Component {

        render() {

            const { eventModel } = this.props;

            return (
                <Popover
                    open={eventModel.displayPopover}
                    anchorEl={eventModel.anchorElement}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    variant="contained"
                    onClose={eventModel.togglePopover}
                >
                    <WrappedComponent eventModel={eventModel} {...this.props} />
                </Popover>
            )
        }
    }
    return EventPopover;
}

export default PopoverWrapper;