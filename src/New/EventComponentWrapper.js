import * as React from "react";
import injectSheet from "react-jss";
import Resizer from "./Resizer";
import Resizable from "re-resizable";
import {observer} from "mobx-react";

const styles = theme => ( {
    eventRoot: props => ( {
        position: "absolute",
        height: "100%",
        zIndex: props.eventModel.layer||0
    } ),
    eventContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: "100%",
    },
    resizer: {
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

        resize = ( evt, direction, ref, delta ) => {
            this.props.eventModel.resize(delta.width, direction);
        }

        stopResize = ( evt, direction, ref, delta ) => {
            this.props.eventModel.stopResize();
        }

        render () {
            return (
                <div style={{height: "100%"}}>
                    <Resizable
                        size={{width: this.props.width + "%", height: "100%"}}
                        onResize={this.resize}
                        onResizeStop={this.stopResize}
                        enable={{top: false,right: true,bottom: false,left: true,topRight: false,bottomRight: false,bottomLeft: false,topLeft: false}}
                        handleClasses={{
                            right: this.props.classes.resizer,
                            left: this.props.classes.resizer
                        }}
                        handleStyles={{
                            right: {right: -1},
                            left: {lefft: -1}
                        }}
                        style={
                            {
                                left: this.props.left+"%"
                            }
                        }
                        className={this.props.classes.eventRoot}
                        grid={[this.props.resizeAmount, 1]}
                    >
                        <div className={this.props.classes.eventContainer}>
                            {this.props.resizable &&
                                <div className={this.props.classes.resizer} style={{left: 1}}>
                                    <Resizer component={this.props.eventModel.resizeComponent} />
                                </div>
                            }
                            <WrappedComponent {...this.props.componentProps} eventModel={this.props.eventModel} />
                            {this.props.resizable &&
                                <div className={this.props.classes.resizer} style={{right: 1}}>
                                    <Resizer component={this.props.eventModel.resizeComponent} />
                                </div>
                            }
                        </div>
                    </Resizable>
                </div>
                
            )
        }

    };
    return Event;
}

export default WrapEventComponent;