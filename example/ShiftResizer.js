import * as React from "react";
import injectSheet from "react-jss";

const styles = {
    shiftResizer: {
        width: 7,
        height: "calc(100% - 12px)",
        backgroundColor: "white",
        border: "solid 1px black",
        borderRadius: 6
    }
}

const ShiftResizer = props => (
    <div className={props.classes.shiftResizer}/>
)

export default injectSheet(styles)(ShiftResizer);