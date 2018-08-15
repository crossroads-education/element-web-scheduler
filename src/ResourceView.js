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
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func
    }

    render() {

        const {schedulerData, slotClickedFunc, slotItemTemplateResolver, classes} = this.props;
        const {renderData, config} = schedulerData;
        let DisplayComponent = (config.resourceComponent) ? config.resourceComponent : DefaultResourceComponent;
        let resourceList = renderData.map((item) => {
            let a = <DisplayComponent slotName={item.slotName} {...item.componentProps}/>;

            const slotItem = (slotItemTemplateResolver) ? 
                slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text") 
                : (
                    <div className={classNames(classes.slotItem, classes.text)}>
                        {a}
                    </div>
                );

            return <ResourceItem key={item.slotName} itemHeight={item.rowHeight} slotId={item.slotId}> {slotItem} </ResourceItem>
        });

        return (
            <div className={classes.resourceListContainer}>
                {resourceList}
            </div>
        )
    }
}

const resourceItemStyles = {
    slotItemWrapper: {
        borderLeft: "solid 1px #e9e9e9",
        borderTop: "solid 1px #e9e9e9",
        height: "100%"
    },
    resourceItem: {
        height: props => props.itemHeight
    },  
}

const resource = ({ classes, slotId, children }) => (
    <div key={slotId} className={classes.resourceItem}>
        <div data-resource-id={slotId} className={classes.slotItemWrapper}>
            {children}
        </div>
    </div>
);

const ResourceItem = injectSheet(resourceItemStyles)(resource);

export default ResourceView