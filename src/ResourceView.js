import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        browserScrollbarHeight: PropTypes.number.isRequired,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func
    }

    render() {

        const {schedulerData, slotClickedFunc, slotItemTemplateResolver} = this.props;
        const {renderData} = schedulerData;
        let width = schedulerData.getResourceTableWidth() - 2;
        let resourceList = renderData.map((item) => {
            let a = item.component ? 
                <item.component slotName={item.slotName} {...item.componentProps}/> : <span>{item.slotName}</span>;
           
           
            let slotItem = (
                <div style={{width: "100%", height: "100%"}} title={item.slotName} className="overflow-text header2-text">
                    {a}
                </div>
            );
            if(!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if(!!temp)
                    slotItem = temp;
            }

            return (
                <div key={item.slotId}>
                    <div data-resource-id={item.slotId} style={{height: item.rowHeight - 1}}>
                        {slotItem}
                    </div>
                </div>
            );
        });

        return (
            <div className="resource-table" style={{width}}>
                {resourceList}
            </div>
        )
    }
}

export default ResourceView