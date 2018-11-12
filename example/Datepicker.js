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
        currentDay: PropTypes.number.isRequired,
        incrementDay: PropTypes.func.isRequired,
        decrementDay: PropTypes.func.isRequired
    }

    render() {

        return (
            <div className={this.props.classes.root}>
                <button 
                    className={this.props.classes.button}
                    onClick={() => {this.props.decrementDay()}}
                >
                    Prev
                </button>
                <button 
                    className={this.props.classes.button} 
                    onClick={this.props.enableEditing}
                >
                    Edit
                </button>
                <p> {moment().day(this.props.currentDay).format("dddd")} </p>
                <button 
                    className={this.props.classes.button}
                    onClick={() => {this.props.incrementDay()}}
                >
                    Next
                </button>
            </div>
        )
    }
}

export default Datepicker
