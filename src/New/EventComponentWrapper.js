import * as React from "react";
import injectSheet from "react-jss";
import Draggable, {DraggableCore} from "react-draggable";
import {observer} from "mobx-react";


const styles = theme => ( {
    eventRoot: props => ( {
        height: "100%",
        zIndex: props.eventModel.layer || 0,
        width: props.width,
        transform: "translateX(" + props.left + ")",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
    }),
    eventResizer: {
        position: "absolute",
        height: "100%",
        display: "flex",
        alignItems: "center",
        cursor: "e-resize !important"
    }
});


function WrapEventComponent(WrappedComponent) {

    @observer 
    @injectSheet(styles)
    class Event extends React.Component {

        resize = (e, data, side) => {
            this.props.eventModel.resize(e, data, side);
        }

        render () {
            return (
                <Draggable
                    position={{x: this.props.left, y: this.props.eventModel.y}}
                    cancel={"." + this.props.classes.eventResizer}
                    onStart={this.props.eventModel.startDrag}
                    onStop={this.props.eventModel.drag}
                >
                    <div className={this.props.classes.eventRoot}>
                        {this.props.resizable &&
                            <DraggableCore
                                onDrag={(e, data) => {this.resize(e, data, "start")}}
                                onStop={this.props.eventModel.stopResize}
                                axis="x"
                            >
                                <div style={{left: 1}} className={this.props.classes.eventResizer}>
                                    <this.props.eventModel.resizeComponent />
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
                                    <this.props.eventModel.resizeComponent />
                                </div>
                            </DraggableCore>
                        }
                    </div>
                </Draggable>
            )
        }

    };
    return Event;
}

export default WrapEventComponent;