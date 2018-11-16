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
                    {headers.map(header => (
                        <div className={classes.header} key={header}>
                            <span style={{float: "left"}}> {header} </span>
                        </div>
                    ))}
            </div>
        );
    }
}

export default Headers;
