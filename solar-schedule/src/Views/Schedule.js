import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "../Styles/schedule.css";
import moment from "moment";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function Schedule(props) {
    const toast = useRef(null);

    if (props.promiseState.promise && !props.promiseState.error && !props.promiseState.data) {
        return (
            <div style={{
                "display": "flex",
                "justifyContent": "center"
            }}>
                <img src="/spinner.svg" alt="loading" />;
            </div>);
    }
    const showError = () => {
        toast.current.show({
            severity: "error",
            summary: "Fetch Error",
            detail: "Failed to fetch solar forecast data.",
            life: 5000
        });
    };

    if (props.promiseState.error) {
        showError();
        return;
    }

    // create Y axis
    const deviceGroups = props.devices.map((dev, index) => {
        return { id: index, title: dev.name };
    });

    // create task bars
    const scheduleItems = [];
    let itemIndex = 0;

    props.devices.forEach((dev, i) => {
        const items = dev.schedule.map((timeFrame) => {
            return {
                id: itemIndex++,
                group: i,
                title: "",
                start_time: timeFrame.start,
                end_time: timeFrame.stop,
                canChangeGroup: false,
                canMove: false,
                canResize: false,
            };
        });

        scheduleItems.push(...items);
    });

    return (
        <Card>
            {props.devices.size !== 0 && scheduleItems[0] && <Timeline
                groups={deviceGroups}
                items={scheduleItems}
                defaultTimeStart={moment().startOf("day").toDate()}
                defaultTimeEnd={moment().startOf("day").add(1, "day").toDate()}
                itemTouchSendsClick={false}
            >
                <TimelineHeaders>
                    <DateHeader unit="primaryHeader" />
                    <DateHeader />
                </TimelineHeaders>
            </Timeline>}
            <Toast ref={toast} />
        </Card>
    );
}
