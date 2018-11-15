import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import { observer } from "mobx-react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import Header from "./Header";
import { isObservable } from "mobx";

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
        height: "auto",
        position: "relative",
        display: "flex",
    },
    rowRoot: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column"
    },
    rowContainer: { 
        display: "flex",
        flex: 1,
        height: "auto",
        borderTop: "solid 1px #9d9d9d"
    },
    eventContainer: {
        width: "100%",
        position: "relative"
    },
    cellRoot: {
        display: "flex",
        position: "absolute",
        width: "100%",
        height: "100%",
        "& $backgroundCell:nth-child(2n)": {
            borderLeft: "dashed 1px #dfdfdf"
        },
    },
    backgroundCell: {
        width: "100%",
        height: "100%",
        borderLeft: "solid 1px #e6e6e6",
    },
    adornmentContainer: {
        borderLeft: "solid 1px #e6e6e6"
    },
    
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    eventRowRef;
    resourceRef;
    adornmentRef;

    constructor(props) {
        super(props);
        this.eventRowRef = null;
        this.resourceRef = null;
        this.adornmentRef = null;
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.updateSize();
    }

    updateSize = () => {
        this.props.schedulerStore.ui.updateSize(this.eventRowRef, this.resourceRef, this.adornmentRef);
    }

    setEventRowRef = element => {
        this.eventRowRef = element;
    }

    setResourceRef = element => {
        this.resourceRef = element;
    }

    setAdornmentRef = element => {
        this.adornmentRef = element;
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme({typography: {useNextVariants: true }})}>
                    <div className={this.props.classes.scheduleBodyContainer} >
                        <div className={classes.rowRoot}>
                            <Header 
                                ui={ui}
                                resource={ui.resourceRef}
                                adornment={ui.adornmentRef}
                            />
                            {schedulerStore.resources.map(resource => (
                                <div className={classes.rowContainer} key={resource.id}>
                                    <div className={classes.resourceContainer} ref={this.setResourceRef} >
                                        <ui.renderResource {...resource.componentProps} resource={resource} {...ui.renderResource.props}/>
                                    </div> 
                                    <div className={classes.eventContainer} ref={this.setEventRowRef}>
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
                                            <div className={classes.cellRoot}>
                                                {schedulerStore.cells.map(cell => (
                                                    <div key={cell} className={classes.backgroundCell} onClick={e => {resource.createEvent(e.target.offsetLeft);}} />
                                                ))}
                                            </div>
                                    </div>
                                    {ui.renderAdornment && 
                                        <div className={classes.adornmentContainer} ref={this.setAdornmentRef}>
                                            <ui.renderAdornment resource={resource} {...ui.renderAdornment.props}/>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </MuiThemeProvider>
            </ThemeProvider>
        )
    }
}

export default Scheduler;