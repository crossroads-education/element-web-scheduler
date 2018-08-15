import * as React from "react";
import { ThemeProvider } from "react-jss";
import Scheduler from "./Scheduler";
import Theme from "./StyleTheme";

console.log(Theme);

const StyledScheduler = (props) => {
    console.log(props)
    return (
        <ThemeProvider theme={Theme}>
            <ThemeProvider theme={props.userStyle || {}}>
                <Scheduler {...props} />
            </ThemeProvider>
        </ThemeProvider>
    );
};

export default StyledScheduler;