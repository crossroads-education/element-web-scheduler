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

        resize = (e, data, side) => {
            this.props.eventModel.resize(e, data, side);
        }

        togglePopover = (e) => {
            this.props.eventModel.togglePopover(e.target);
        }

        render () {

            return (
                <Draggable
                    cancel={"." + this.props.classes.eventResizer}
                    onStart={this.props.eventModel.startDrag}
                    onStop={this.props.eventModel.drag}
                >
                    <div 
                        className={this.props.classes.eventRoot}
                        style={{
                            zIndex: this.props.eventModel.layer||0,
                            width: this.props.eventModel.width,
                            left: this.props.eventModel.left,
                        }}
                    >
                        {this.props.eventModel.resizable &&
                            <DraggableCore
                                onDrag={(e, data) => {this.resize(e, data, "start")}}
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
                        {this.props.eventModel.resizable &&
                            <DraggableCore
                                onDrag={(e, data) => {this.resize(e, data, "end")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                                onMouseDown={e => {e.stopPropagation();}}
                            >
                                <div style={{right: 1}} className={this.props.classes.eventResizer}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        {this.props.eventModel.popover && 
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