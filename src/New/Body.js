import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";


const styles = theme => ({
    rowContainer: {
        borderBottom: theme.borders.row,
        boxSizing: "border-box",
        width: "100%",
        flex: 1,
        zIndex: props => props.activeLayer
    },
    bodyRoot: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        zIndex: props => props.activeLayer
    }
});

@injectSheet(styles)
@observer
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

