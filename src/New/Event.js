import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import Resizer from "./Resizer";
import Resizable from "re-resizable";
import {observer} from "mobx-react";

const styles = theme => ({
    eventRoot: props => ({
        position: "absolute",
        height: "100%",
        zIndex: props.eventModel.layer || 0
    }),
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

@injectSheet(styles)
@observer
export default class Event extends React.Component {

    constructor(props) {
        super(props);
        this.eventRef = null;

        this.setEventRef = element => { this.eventRef = element };

        this.parentWidth = () => {
            if(this.eventRef) return this.eventRef.offsetParent.clientWidth;
        }
    }

    static propTypes = {
        eventModel: PropTypes.object.isRequired
    }

    resize = (evt, direction, ref, delta) => {
        this.props.resize(delta.width, direction);
    }

    resizeStop = (evt, direction, ref, delta) => {
        this.props.stopResize();
    }

    render() {
        const Component = this.props.eventModel.component;

        const width = this.props.eventModel.width;
        const left = this.props.eventModel.left;

        const resizeAmount = 
        
        const content = this.props.eventModel.active ? 
            <React.Fragment>
                {this.props.eventModel.resizable &&
                    <div className={this.props.classes.resizer} style={{ left: 1 }}>
                        <Resizer component={this.props.eventModel.resizeComponent} />
                    </div>
                }
                    <Component {...this.props.eventModel.componentProps} eventModel={this.props.eventModel} />
                {this.props.eventModel.resizable && 
                    <div className={this.props.classes.resizer} style={{ right: 1 }}>
                        <Resizer component={this.props.eventModel.resizeComponent} />
                    </div>
                }
            </React.Fragment> : 
          <Component {...this.props.eventModel.componentProps} eventModel={this.props.eventModel} />;
        return (
            <div ref={this.setEventRef} style={{height: "100%"}}>
                <Resizable
                    size={{width: width + "%",height: "100%"}}
                    onResize={this.resize}
                    onResizeStop={this.resizeStop}
                    enableResizing={{top: false,right: true,bottom: false,left: true,topRight: false,bottomRight: false,bottomLeft: false,topLeft: false}}
                    resizeHandleClasses={{
                        right: this.props.classes.resizer,
                        left: this.props.classes.resizer
                    }}
                    resizeHandleStyles={{
                        right: {right: -1},
                        left: {lefft: -1}
                    }}
                    style={
                        {
                            left: left + "%"
                        }
                    }
                    className={this.props.classes.eventRoot}
                    grid={[resizeSize, 1]}
                >
                    <div className={this.props.classes.eventContainer}>
                        {content}
                    </div>
                </Resizable>
            </div>  
        );
    }

}