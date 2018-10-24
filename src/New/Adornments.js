import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import moment from "moment";
import {observer} from "mobx-react";

const styles = theme => ({
    adornmentContainer: {
        borderBottom: theme.borders.row,
        boxSizing: "border-box",
        backgroundColor: theme.rowColors.even,
        height: "100%"
    },
    adornmentRoot: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& $adornmentContainer:nth-child(odd)": {
            backgroundColor: theme.rowColors.odd//"#F2F1F1"
        },
        height: "100%",
        borderRight: theme.borders.resources,
    }  
})

const Adornments = props => {
    return (
        <div className={props.classes.adornmentRoot}>
            {props.resources.map(resource => (
                <div className={props.classes.adornmentContainer}>
                    <props.adornmentComponent resource={resource}/>
                </div>
            ))}
        </div>
    )
}

export default injectSheet(styles)(observer(Adornments));
