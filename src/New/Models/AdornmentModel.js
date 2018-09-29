import { observable, computed } from "mobx";

class AdornmentModel {
    @observable componentProps;
    adornmentComponent;
    resourceRow;

    constructor(adornmentComponent, componentProps, resourceRow) {
        this.adornmentComponent = adornmentComponent;
        this.componentProps = componentProps;
        this.resourceRow = resourceRow;
    }


}


export default AdornmentModel;