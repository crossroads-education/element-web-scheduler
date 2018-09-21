import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import DefaultResourceComponent from "./DefaultResourceComponent";
import injectSheet from "react-jss"
import classNames from "classnames"

const styles = theme => ({
    text: {
        extend: [{...theme.overFlowText}, {...theme.header2Text}]
    },
    slotItem: {
        width: "100%", 
        height: "100%",
        borderTop: "solid 1px #e9e9e9",
        borderLeft: "solid 1px #e9e9e9",
        extend: props => props.userStyle.slotItem
    },
    resourceListContainer: {
        extend: theme.schedulerDisplayTable,
        width: props => props.schedulerData.getResourceTableWidth()
    },
});

@injectSheet(styles)
class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        slotClickedFunc: PropTypes.func
    }

    render() {

        const {schedulerData, classes, resourceComponent} = this.props;
        const {renderData, config} = schedulerData;
        let DisplayComponent = (resourceComponent) ? resourceComponent : DefaultResourceComponent;
        let resourceList = renderData.map((item) => (
            <div 
                key={item.slotName} 
                data-resource-id={item.slotId} 
                style={{ height: item.rowHeight}}
                className={classNames(classes.slotItem, classes.text)}
            > 
                <DisplayComponent {...item.componentProps} resourceItem={item}/>
            </div>
        ));

        return (
            <div className={classes.resourceListContainer}>
                {resourceList}
            </div>
        )
    }
}

export default ResourceView