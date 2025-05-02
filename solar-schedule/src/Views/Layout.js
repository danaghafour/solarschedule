import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import "../Styles/layout.css";
import DevicesPresenter from "../presenters/devicesPresenter";
import { observer } from "mobx-react-lite";
import HistoryPresenter from "../presenters/historyPresenter";
import AddEditDevicePresenter from "../presenters/addEditDevicePresenter";
import AccountOptions from "./AccountOptions";

export default observer(function Layout(props) {
  const [deviceSidebarActive, setDeviceSidebarActive] = useState(false);
  const [historySidebarActive, setHistorySidebarActive] = useState(false);
  const [accountSidebarActive, setAccountSidebarActive] = useState(false);
  const [deviceDialogVisible, setDeviceDialogVisible] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const openEditDeviceDialog = (deviceToEdit) => {
    setEditingDevice(deviceToEdit); 
    setDeviceDialogVisible(true);
};

const openAddDeviceDialog = () => {
    setEditingDevice(null); 
    setDeviceDialogVisible(true);
};

  const responsiveBreakpoint = 768;

  useEffect(() => {
    function handleResize() {
      if (globalThis.window.innerWidth < responsiveBreakpoint) {
        setDeviceSidebarActive(false);
        setHistorySidebarActive(false);
        setAccountSidebarActive(false);
      }
    }

    globalThis.window.addEventListener("resize", handleResize);
    handleResize();
    return () => globalThis.window.removeEventListener("resize", handleResize);
  }, []);

  let mainContainerClass = "main-container";
  if (deviceSidebarActive) mainContainerClass += " shifted-left";
  if (historySidebarActive) mainContainerClass += " shifted-right";

  function handleClickDevices() {
    setDeviceSidebarActive(!deviceSidebarActive);
  }
  function handleClickHistory() {
    setHistorySidebarActive(!historySidebarActive);
  }
  function handleClickAccount() {
    setAccountSidebarActive(!accountSidebarActive);
  }

  return (
    <div>
      <DevicesPresenter
        model={props.model}
        deviceSidebarActive={deviceSidebarActive}
        setDeviceSidebarActive={setDeviceSidebarActive}
        openAddDeviceDialog={openAddDeviceDialog}
        openEditDeviceDialog={openEditDeviceDialog}
        editingDevice={editingDevice}
        setEditingDevice={setEditingDevice}
      />
      <HistoryPresenter
        model={props.model}
        historySidebarActive={historySidebarActive}
        setHistorySidebarActive={setHistorySidebarActive}
      />
      <div className={mainContainerClass}>
        <div className="flex justify-content-between align-items-center flex-wrap">
          <div className="flex align-items-center">
            <Button
              icon="pi pi-align-justify"
              rounded
              text
              aria-label="Filter"
              onClick={handleClickDevices}
            />
            <img src="/icon.png" alt="Sidebar Icon" className="sidebar-icon" />
          </div>
          <div className="title">Solar Schedule</div>
          <div className="flex align-items-center">
            <Button
              icon="pi pi-book"
              rounded
              text
              aria-label="Filter"
              onClick={handleClickHistory}
            />
            <Button
              icon="pi pi-cog"
              rounded
              text
              aria-label="Filter"
              onClick={handleClickAccount}
            />
          </div>
        </div>

        <div>
          <BlockUI blocked={!props.model.ready} template={<ProgressSpinner />}>
            <Outlet />
          </BlockUI>
        </div>
      </div>
      <AccountOptions
        model={props.model}
        setAccountSidebarActive={setAccountSidebarActive}
        accountSidebarActive={accountSidebarActive}
      />
      <AddEditDevicePresenter
        model={props.model}
        deviceDialogVisible={deviceDialogVisible}
        setDeviceDialogVisible={setDeviceDialogVisible}
        editingDevice={editingDevice}
        setEditingDevice={setEditingDevice}
      />
    </div>
  );
});
