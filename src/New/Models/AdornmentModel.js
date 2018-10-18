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

    @computed get adornmentProps() {
        return this.adornmentProps;
    }


}


export default AdornmentModel;