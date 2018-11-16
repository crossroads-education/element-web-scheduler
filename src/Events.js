import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    eventContainer: {
        width: "100%",
        position: "relative"
    },
}

@injectSheet(styles)
@observer
class Events extends React.Component {
    render() {
        const { classes, events, paintedEvent } = this.props;

        return (
            <div className={classes.eventContainer} >
                {events.map(event => (
                    <event.render
                        key={event.id}
                        eventModel={event}
                        active={event.active}
                        componentProps={event.componentProps}
                        resizable={event.resizable}
                        width={event.width}
                        left={event.left}
                    />

                ))}
                {paintedEvent && 
                    <paintedEvent.render 
                        eventModel={paintedEvent}
                        active={paintedEvent.active}
                        componentProps={paintedEvent.componentProps}
                        resizable={paintedEvent.resizable}
                        width={paintedEvent.width}
                        left={paintedEvent.left}
                    />
                }
            </div>
        );
    }
}

export default Events;
