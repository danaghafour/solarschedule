import Devices from "../Views/Devices";
import { observer } from "mobx-react-lite";

export default observer(
    function DevicesPresenter(props) {
        function handleDeleteDeviceCB(name) {
            props.model.deleteDevice(name);
        }

        return (
            <Devices devices={props.model.devices.slice()}
                deviceSidebarActive={props.deviceSidebarActive}
                setDeviceSidebarActive={props.setDeviceSidebarActive}
                handleDeleteDevice={handleDeleteDeviceCB}
                openAddDeviceDialog={props.openAddDeviceDialog}
                openEditDeviceDialog={props.openEditDeviceDialog}
            />
        );
    }
);
