import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";


const styles = theme => ({
    eventContainer: props => ({
        width: Math.round(props.width * 100) + "%",
        left: Math.round(props.offset * 100) + "%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: "100%",
        zIndex: props.event.layer || 0
    })
});

@injectSheet(styles)
export default class Event extends React.Component {

    static propTypes = {
        event: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        resizerComponent: PropTypes.object,
    }

    render() {
        const {resizable, movable, component, ...componentProps} = this.props.event;

        const Component = component; 

        return (
            <div className={this.props.classes.eventContainer}>
                {resizable && <Resizer resize="start" component={resizerComponent}/>}
                <Component {...componentProps} />
                {resizable && <Resizer resize="end" component={resizerComponent}/>}
            </div>
        )
    }

}