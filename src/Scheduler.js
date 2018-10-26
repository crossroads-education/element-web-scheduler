import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import { observer } from "mobx-react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

const styles = {
    schedulerContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%"
    },
    scheduleBodyContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column"
    },
    rowContainer: {
        display: "flex",
        flex: 1
    },
    resourceContainer: {

    },
    eventContainer: {
        width: "100%",
        position: "relative"
    },
    adornmentContainer: {

    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    bodyRootRef;

    constructor(props) {
        super(props);
        this.bodyRootRef = React.createRef();
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.schedulerStore.ui.setBodySize(this.bodyRootRef);
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme()}>
                    <div className={this.props.classes.scheduleBodyContainer} >
                        {schedulerStore.resources.map(resource => (
                            <div className={classes.rowContainer} key={resource.id}>
                                <div className={classes.resourceContainer}>
                                    <ui.renderResource {...resource.componentProps} resource={resource} />
                                </div> 
                                <div className={classes.eventContainer} ref={this.bodyRootRef}>
                                    {resource.todaysEvents.map(event => {
                                        return (<event.render
                                            key={event.id}
                                            eventModel={event}
                                            active={event.active}
                                            componentProps={event.componentProps}
                                            resizable={event.resizable}
                                            width={event.width}
                                            left={event.left}
                                        />);
                                    })}
                                </div>
                                <div className={classes.adornmentContainer}>
                                    <ui.renderAdornment resource={resource} />
                                </div>
                                <div className={classes.backgroundRoot}>
                                </div>
                            </div>
                        ))}
                    </div>
                </MuiThemeProvider>
            </ThemeProvider>
            
        )
    }
}

export default Scheduler;