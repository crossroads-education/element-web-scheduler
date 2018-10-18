import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";

const styles = {
    rowEventContainer: {
        width: "100%",
        height: "100%",
        position: "relative"
    }
}

@injectSheet(styles)
@observer
export default class Row extends React.Component {

    static propTypes = {
        rowModel: PropTypes.object.isRequired,
        activeLayer: PropTypes.number.isRequired
    }

    render() {
        const {rowModel} = this.props;
        const events = rowModel.todaysEvents;
        
        return (
            <div className={this.props.classes.rowEventContainer}>
                {events.map(event => {
                    return (<event.component
                        key={event.id}
                        eventModel={event}
                        active={event.active}
                        componentProps={event.componentProps}
                        resizable={event.resizable}
                        width={event.width}
                        left={event.left}
                        resizeAmount={event.resizeAmount}
                    />);
                })}
            </div>
        )
    }
}