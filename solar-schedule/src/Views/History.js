import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FaInfoCircle } from "react-icons/fa";
import "../Styles/layout.css";

export default function History(props) {
  return (
    <div
      className={`sidebar p-3 right-sidebar-container ${
        props.historySidebarActive ? "active" : ""
      }`}
    >
      <div className="flex flex-column">
        <div className="flex justify-content-between align-items-center">
          <h2>Statistics</h2>
          <Button
            className="p-sidebar-close"
            icon="pi pi-times"
            rounded
            text
            onClick={props.closeHistory}
            aria-label="Close"
            severity="secondary"
          />
        </div>
        <div className="notice">
          The statistics are only calculated up to yesterday
        </div>
      </div>
      <div className="flex flex-column gap-3">
        {props.history.map((item, index) => (
          <DataCard
            key={index}
            title={item.title}
            electricityCost={item.electricityCost}
            co2={item.co2}
            averagePricePerkwh={item.averagePricePerkwh}
            averageCO2Perkwh={item.averageCO2Perkwh}
          />
        ))}
      </div>
    </div>
  );
}

const DataCard = ({
  title,
  electricityCost,
  co2,
  averagePricePerkwh,
  averageCO2Perkwh,
}) => {
  return (
    <Card title={title}>
      <h4>
        Total:{" "}
        <FaInfoCircle
          title="Total costs and CO2 consumption due to the use of electricity from the grid during the hours when the sun was not sufficient to power all devices."
          fontSize={13}
        />{" "}
      </h4>
      <div className="flex justify-content-between">
        <div>Cost: {(electricityCost / 100).toFixed(2)}€</div>
        <div>CO2: {(co2 / 1000).toFixed(2)}kg </div>
      </div>
      <h4>
        Average:{" "}
        <FaInfoCircle
          title="Average costs and CO2 per kWh calculated with the total (solar and grid) electricity consumption"
          fontSize={13}
        />{" "}
      </h4>

      <div className="flex justify-content-between">
        <div>Cost: {averagePricePerkwh.toFixed(2)}c/kWh</div>
        <div>CO2: {Math.round(averageCO2Perkwh)}g/kWh </div>
      </div>
    </Card>
  );
};
