import * as React from "react";
import injectSheet from "react-jss";
import Draggable, {DraggableCore} from "react-draggable";
import {observer} from "mobx-react";


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
    }
});


function EventWrapper(WrappedComponent) {

    @observer 
    @injectSheet(styles)
    class Event extends React.Component {

        edit = (e, data, side) => {
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
                        className={this.props.classes.eventRoot}
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
                                <div style={{left: 1}} className={this.props.classes.eventResizer}>
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
                                <div style={{right: 1}} className={this.props.classes.eventResizer}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        {this.props.eventModel.popover && !this.props.eventModel.static && 
                            <this.props.eventModel.popover
                                eventModel={this.props.eventModel}
                            />
                        }
                    </div>
                </Draggable>
            )
        }

    };
    return Event;
}

export default EventWrapper;