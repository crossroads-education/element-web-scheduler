import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import Resizer from "./Resizer";
import {Rnd} from "react-rnd";

const styles = theme => ({
    eventRoot: props => ({
        width: Math.round(props.width * 100) + "%",
        left: Math.round(props.offset * 100) + "%",
        position: "absolute",
        height: "100%",
        zIndex: props.event.layer || 0
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
export default class Event extends React.Component {

    static propTypes = {
        event: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired
    }

    resize = (evt, direction, ref, delta) => {
        this.props.resize(direction, delta.width, this.props.event);
    }

    stopResize = (evt,direction,ref,delta) => {
        this.props.stopResize(direction, delta.width, this.props.event);
    }

    render() {
        const {active, event} = this.props;

        const {resizable, movable, component, resizeComponent, ...componentProps} = this.props.event;

        const Component = component;

        const content = (active) ? (
            <React.Fragment>
                {resizable &&
                    <div className={this.props.classes.resizer} style={{left: 1}} >
                        <Resizer component={resizeComponent} />
                    </div>
                }
                <Component {...componentProps} />
                {resizable &&
                    <div className={this.props.classes.resizer} style={{right: 1}}>
                        <Resizer component={resizeComponent} />
                    </div>
                }
            </React.Fragment>
        ) : (
            <Component {...componentProps} />
        );

        return (
            <div className={this.props.classes.eventRoot}>
                <Rnd
                    default={{ width: "100%", height: "100%" }}
                    onResize={this.resize}
                    disableDragging={true}
                    enableResizing={{top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false}}
                    resizeHandleClasses={{
                        right: this.props.classes.resizer,
                        left: this.props.classes.resizer
                    }}
                    resizeHandleStyles={{
                        right: {right: -1},
                        left: {lefft: -1}
                    }}
                >
                    <div className={this.props.classes.eventContainer}>
                        {content}
                    </div>
                </Rnd>
            </div>
        );
    }

}