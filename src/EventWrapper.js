import * as React from "react";
import injectSheet from "react-jss";
import Draggable, {DraggableCore} from "react-draggable";
import {observer} from "mobx-react";


const styles = theme => ( {
    eventRoot: props => ( {
        height: "100%",
        zIndex: props.eventModel.layer || 0,
        width: props.width,
        transform: "translateX(" + props.left + "px)",
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
                    position={{x: this.props.left, y: this.props.eventModel.y}}
                    cancel={"." + this.props.classes.eventResizer}
                    onStart={this.props.eventModel.startDrag}
                    onStop={this.props.eventModel.drag}
                >
                    <div 
                        className={this.props.classes.eventRoot}
                        onClick={this.togglePopover}
                    >
                        {this.props.resizable &&
                            <DraggableCore
                                onDrag={(e, data) => {this.resize(e, data, "start")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                            >
                                <div style={{left: 1}} className={this.props.classes.eventResizer}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        <WrappedComponent {...this.props.componentProps} eventModel={this.props.eventModel} />
                        {this.props.resizable &&
                            <DraggableCore
                                onDrag={(e, data) => {this.resize(e, data, "end")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                            >
                                <div style={{right: 1}} className={this.props.classes.eventResizer}>
                                    <this.props.eventModel.resizer />
                                </div>
                            </DraggableCore>
                        }
                        <this.props.eventModel.popover
                            open={this.props.eventModel.displayPopup}
                            anchor={this.props.eventModel.anchorElement}
                            eventModel={this.props.eventModel}
                        />
                    </div>
                    
                </Draggable>
            )
        }

    };
    return Event;
}

export default EventWrapper;