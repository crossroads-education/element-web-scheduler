import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import { observer} from "mobx-react";
import moment from "moment";

const styles = {

    root: {
        width: "100%",
        height: 85,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"   
    },
    button: {
        width: 120,
        height: 40
    }
};

@observer
@injectSheet(styles)
class Datepicker extends React.Component {

    static propTypes = {
        currentDate: PropTypes.string.isRequired,
        incrementDate: PropTypes.func.isRequired,
        decrementDate: PropTypes.func.isRequired
    }

    render() {

        return (
            <div className={this.props.classes.root}>
                <button 
                    className={this.props.classes.button}
                    onClick={() => {this.props.incrementDate()}}
                >
                    Prev
                </button>
                <p> {moment(this.props.currentDate).format("dddd")} </p>
                <button 
                    className={this.props.classes.button}
                    onClick={() => {this.props.decrementDate()}}
                >
                    Next
                </button>
            </div>
        )
    }
}

export default Datepicker
