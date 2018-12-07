import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    headerContainer: {
        display: "flex",
        height: props => props.ui.headerHeight,
        alignItems: "center",
    },
    header: {
        width: "100%"
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
                    <div className={classes.header} key={"h-" + header}>
                        <span style={{ float: "left", marginLeft: "-8%" }}> {header} </span>
                    </div>
                ))}
            </div>
        );
    }
}

export default Headers;
