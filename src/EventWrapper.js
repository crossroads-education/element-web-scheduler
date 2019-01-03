import * as React from "react";
import classNames from "classnames";
import injectSheet from "react-jss";
import Draggable, {DraggableCore} from "react-draggable";
import {observer} from "mobx-react";
import { ClickAwayListener } from "@material-ui/core";

const styles = theme => ( {
    eventRoot: props => ( {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    }),
    eventResizer: {
        position: "absolute",
        height: "100%",
        display: "flex",
        alignItems: "center",
        cursor: "e-resize !important"
    },
    eventWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    disabledEvent: {
        pointerEvents: "none"
    },
    mobileEvent: {
        [theme.breakpoints.down("sm")]: {
            pointerEvents: "none"
        }
    }
});


function EventWrapper(WrappedComponent) {

    @observer 
    @injectSheet(styles)
    class Event extends React.Component {
        eventRef;

        edit = (e, data, side) => {
            e.stopPropagation();
            this.props.eventModel.edit(this.props.eventModel.resize(e, data, side), side);
        }

        togglePopover = (e) => {
            this.props.eventModel.togglePopover(e.target);
        }

        render () {
            return (
                <Draggable
                    axis="none"
                    cancel={"." + this.props.classes.eventResizer}
                >
                    <div
                        className={classNames(this.props.classes.eventRoot, { [this.props.classes.disabledEvent]: this.props.eventModel.disabledLayer, [this.props.classes.mobileEvent]: this.props.eventModel.schedule.disableMobileEdit })}
                        style={{
                            zIndex: this.props.eventModel.layer || 0,
                            width: this.props.eventModel.width,
                            left: this.props.eventModel.left,

                        }}
                    >
                        {this.props.eventModel.canResize && this.props.eventModel.resizer &&
                            <DraggableCore
                                onDrag={(e, data) => {this.edit(e, data, "start")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                                onMouseDown={e => {e.stopPropagation();}}
                            >
                                <div style={{ left: 1, zIndex: (this.props.eventModel.layer || 0) + 1 }} className={this.props.classes.eventResizer} onClick={this.togglePopover}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        <div className={this.props.classes.eventWrapper} onClick={this.togglePopover}>
                            <WrappedComponent {...this.props.componentProps} eventModel={this.props.eventModel} />
                        </div>
                        {this.props.eventModel.canResize && this.props.eventModel.resizer && 
                            <DraggableCore
                                onDrag={(e, data) => {this.edit(e, data, "end")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                                onMouseDown={e => {e.stopPropagation();}}
                            >
                                <div style={{ right: 1, zIndex: (this.props.eventModel.layer || 0) + 1 }} className={this.props.classes.eventResizer} onClick={this.togglePopover}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        {this.props.eventModel.popover && !this.props.eventModel.static &&
                            <ClickAwayListener onClickAway={this.togglePopover}>
                                <this.props.eventModel.popover
                                    eventModel={this.props.eventModel}
                                />
                            </ClickAwayListener>
                        }
                    </div>
                </Draggable>
            )
        }

    };
    return Event;
}

export default EventWrapper;