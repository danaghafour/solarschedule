import Schedule from "../Views/Schedule";
import { observer } from "mobx-react-lite";

export default observer( function SchedulePresenter(props){
    return (
        <Schedule devices={props.model.devices.slice()} promiseState={props.model.solarAPIPromiseState}/>
    );
});
