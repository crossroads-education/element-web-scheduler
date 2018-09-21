import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";

const styles = theme => ({
    rowContainer: {
        borderBottom: theme.borders.row,
        boxSizing: "border-box",
        width: "100%",
        height: "100%"
    },
    bodyRoot: {
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    }
});

@injectSheet(styles)
export default class Body extends React.Component {

    static propTypes = {
        rows: PropTypes.arrayOf(PropTypes.element).isRequired,
    }
    
    render() {
        return (
            <div className={this.props.classes.bodyRoot}>
                {this.props.rows.map((row, index) => (
                    <div className={this.props.classes.rowContainer} key={index}>
                        {row}
                    </div>

                ))}
            </div>
        )
    }

}

