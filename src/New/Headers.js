import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import {observer} from "mobx";

const styles = theme => ({

    

});

class Headers extends React.Component {

    static propTypes = {
        headers: PropTypes.arrayOf.string,
        headerComponent: PropTypes.func.isRequired
    }

    render() {
        return (
            <div
        )
    }

}
