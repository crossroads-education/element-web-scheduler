import * as React from "react";
import { observer, Provider } from "mobx-react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import Resources from "./Resources";
import Rows from "./Rows";
import Adornments from "./Adornments";

const styles = {
    root: {
        width: "100%",
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "flex-end",
        height: "100%"
    },
    headerRoot: {
        display: "flex"
    },
    headerContainer: {
        display: "flex",
        minHeight: "40px",
        alignItems: "center",
        borderRight: "solid 1px #e6e6e6",
        borderLeft: "solid 1px #e6e6e6",
        flex: 1
    },
    header: {
        width: "100%"
    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme({typography: {useNextVariants: true }})}>
                    <Provider ui={ui} schedule={schedulerStore}>
                        <div className={classes.root}>
                            <Resources
                                resources={schedulerStore.resources}
                            />
                            <Rows
                                resources={schedulerStore.resources}
                            />
                            <Adornments 
                                resources={schedulerStore.resources}
                            />
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </ThemeProvider>
        )
    }
}

export default Scheduler;