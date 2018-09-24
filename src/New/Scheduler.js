import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";
import {Background, Body,  Row, Resources} from "./";
import Theme from "./Theme";
import Moment from "moment";
import { extendMoment } from "moment-range";


const moment = extendMoment(Moment);

const styles = {
    schedulerContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%"
    },
    scheduleBodyContainer: {
        width: "100%",
        height: "100%",
        position: "relative"
    }
}

@injectSheet(styles)
export default class Scheduler extends React.Component {
    bodyRootRef = React.createRef();

    static propTypes = {
        resources: PropTypes.arrayOf(PropTypes.object).isRequired,
        resourceComponent: PropTypes.func.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        minuteStep: PropTypes.number.isRequired,
        backgroundLayer: PropTypes.number.isRequired,
        activeLayer: PropTypes.number.isRequired,
        resizeSnap: PropTypes.bool,
    }

    resizeEvent = (direction , delta, event) => {

        const originalEvent = this.props.resources.reduce((prev, curr) => prev.concat(curr.events), []).filter((value => value && value.id === event.id))[0];

        const percentChange = delta / this.bodyRootRef.current.clientWidth;

        const time = moment.range([moment(this.props.start), moment(this.props.end)]).valueOf();

        const diff = time * percentChange;
        
        const timeLabel = direction === "right" ? "end" : "start";

        const oldTime = moment(event[timeLabel]);

        const newEvent = {...originalEvent, [timeLabel]: oldTime.add(diff, "milliseconds").format("YYYY-MM-DD HH:mm:ss")};

        this.props.resizeEvent(newEvent);
        //const diff = time * delta / this.
    }

    stopResizeEvent = (direction, delta, event) => {
        console.log(direction, delta, event);
    }

    render() {

        const {resources, resourceComponent, start, end, minuteStep} = this.props;

        const range = moment.range([moment(start), moment(end)]);

        const rows = resources.map(resource => {

            const todaysEvents = (resource.events) ? 
                resource.events.filter(event => range.contains(moment(event.start)) || range.contains(moment(event.end))) :
                []

            return (
                <Row 
                    start={start}
                    end={end}
                    events={todaysEvents}
                    resizeEvent={this.resizeEvent}
                    stopResizeEvent={this.stopResizeEvent}
                    activeLayer={this.props.activeLayer}
                />
            )
        }); 

        return (
            <ThemeProvider theme={Theme}>
                <div className={this.props.classes.schedulerContainer}>
                    <Resources
                        resources={resources}
                        resourceComponent={resourceComponent}
                    />
                    <div className={this.props.classes.scheduleBodyContainer} ref={this.bodyRootRef}>
                        <Background
                            start={start}
                            end={end}
                            minutesPerCell={minuteStep}
                            rowCount={resources.length}
                            layer={this.props.backgroundLayer}
                        />
                        <Body
                            rows={rows}
                        />
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

