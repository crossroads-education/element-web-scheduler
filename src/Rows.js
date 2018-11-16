import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";
import Events from "./Events";
import Background from "./Background";
import Headers from "./Headers";

const styles = {
    root: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column"
    },
    rowContainer: {
        display: "flex",
        height: "auto",
        borderTop: "solid 1px #9d9d9d",
        height: props => props.ui.rowHeight,
        position: "relative"
    }
}

@inject("ui")
@injectSheet(styles)
@observer
class Rows extends React.Component {
    rowsRef;

    constructor(props) {
        super(props);
        this.rowsRef = undefined;
    }

    setRowsRef = element => {
        this.rowsRef = element;
    }

    componentDidMount() {
        this.props.ui.setRowSize(this.rowsRef)
    }

    render() {

        const { classes, resources, ui } = this.props;

        return (
            <div className={classes.root} ref={this.setRowsRef}>
                {ui.displayHeaders && 
                    <Headers 
                        headers={ui.headers}
                    />
                }
                {resources.map(resource => (
                    <div className={classes.rowContainer} key={resource.id}>
                        <Events
                            events={resource.todaysEvents}
                            paintedEvent={resource.paintedEvent}
                        />
                        <Background
                            resource={resource}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default Rows;
