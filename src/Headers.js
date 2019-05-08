import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    headerContainer: {
        height: props => props.ui.headerHeight,
        position: "relative"
    },
    header: {
        position: "absolute",
        display: "flex",
        width: 0,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    spanStyle: {
        display: "inline-block",
        padding: "0 0.25em"
    }
}

@inject("ui")
@injectSheet(styles)
@observer
class Headers extends React.Component {

    render() {
        const { classes, headers } = this.props;
        return (
            <div className={classes.headerContainer}>
                {this.props.ui.renderResourceHeader && <div className={classes.header} key="empty-header" />}
                {headers.map(header => (
                    <div
                        className={classes.header}
                        key={"h-" + header.asString}
                        style={{ left: header.left, justifyContent: header.alignment }}
                    >
                        <span className={classes.spanStyle}> {header.asString} </span>
                    </div>
                ))}
            </div>
        );
    }
}

export default Headers;