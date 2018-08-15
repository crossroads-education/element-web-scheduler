import * as React from "react";
import { ThemeProvider } from "react-jss";
import Scheduler from "./Scheduler";
import Theme from "./StyleTheme";

console.log(Theme);

const StyledScheduler = (props) => (
    <ThemeProvider theme={Theme}>
        <Scheduler {...props} />
    </ThemeProvider>
);

export default StyledScheduler;