import * as React from "react";
import injectSheet from "react-jss";
import {EventWrapper} from "../src/";

const styles = {

    root: {
        width: "100%",
        height: "100%",
        background: "repeating-linear-gradient(45deg, white, white 2px, #dfdfdf 2px, #dfdfdf 4px)"
    }

}

const Availability = ({eventModel, classes}) => {
    return (
        <div className={classes.root}/>
    );
}

export default EventWrapper(injectSheet(styles)(Availability));
