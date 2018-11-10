import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import { observer } from "mobx-react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import ReactWindowSizeListener from "react-window-size-listener";

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
        position: "relative",
        borderRight: "solid 1px #e6e6e6"
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
    headerRoot: {
        display: "flex"
    },
    headerContainer: {
        display: "flex",
        minHeight: "40px",
        alignItems: "center",
        borderRight: "solid 1px #e6e6e6",
        borderLeft: "solid 1px #e6e6e6"
    },
    header: {
        width: "100%"
    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    bodyRootRef;

    constructor(props) {
        super(props);
        this.bodyRootRef = React.createRef();
        this.resourceRef = React.createRef();
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    componentDidMount() {
       this.onResize();
    }

    onResize = () => {
        this.props.schedulerStore.ui.setBodySize(this.bodyRootRef);
        this.props.schedulerStore.ui.setResourceSize(this.resourceRef);
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme({typography: {useNextVariants: true }})}>
                    <div className={this.props.classes.scheduleBodyContainer} >
                        <div className={classes.rowRoot}>
                            <div className={classes.headerRoot}>
                                <div className={classes.resourceContainer} style={{width: ui.resourceWidth}}>
                                </div>
                                {ui.displayHeaders && 
                                    <div className={classes.headerContainer} style={{width: ui.bodyWidth}}>
                                        {ui.headers.map(header => (
                                            <div className={classes.header} key={header}>
                                                <span style={{ float: "left" }}> {header} </span>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            {schedulerStore.resources.map(resource => (
                                <div className={classes.rowContainer} key={resource.id}>
                                    <div className={classes.resourceContainer} ref={this.resourceRef} >
                                        <ui.renderResource {...resource.componentProps} resource={resource} />
                                    </div> 
                                    <div className={classes.eventContainer} ref={this.bodyRootRef}>
                                        <ReactWindowSizeListener onResize={this.onResize}>
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
                                        </ReactWindowSizeListener>
                                    </div>
                                    {ui.renderAdornment && 
                                        <div className={classes.adornmentContainer}>
                                            <ui.renderAdornment resource={resource} />
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