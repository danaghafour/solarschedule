import { Button } from "primereact/button";

export default function Devices(props) {
  const closeDevices = () => {
    props.setDeviceSidebarActive(false);
  };

  function renderDeviceCB(device) {
    return (
      <div
      key={device.name}
      className="flex align-items-center justify-content-between surface-200 px-2 py-1 border-round-sm"
      >
        <span>{device.name}</span>
        <div>
          <Button
            icon="pi pi-pencil"
            onClick={() => props.openEditDeviceDialog(device)}
            rounded
            text
            severity="warning"
            aria-label="Edit Device"
          />
          <Button
            icon="pi pi-trash"
            onClick={() => props.handleDeleteDevice(device.name)}
            rounded
            text
            severity="danger"
            aria-label="Delete Device"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`py-2 flex flex-column sidebar align-items-center justify-content-between left-sidebar-container ${
        props.deviceSidebarActive ? "active" : ""
      }`}
    >
      <div className="flex justify-content-between w-11">
        <h2>Devices</h2>
        <Button
          className="p-sidebar-close"
          icon="pi pi-times"
          rounded
          text
          onClick={closeDevices}
          aria-label="Close"
          severity="secondary"
        />
      </div>
      <div className="w-11 h-full">{props.devices.map(renderDeviceCB)}</div>
      <Button
        className="w-11"
        label="Add Device"
        icon="pi pi-plus"
        severity="success"
        onClick={props.openAddDeviceDialog}
      />
    </div>
  );
}
