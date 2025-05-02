import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

export default function DeviceManagement(props) {
  const { values, handleChange, handleSubmit, errors, touched } = props.formik;
  const frequencyOptions = [
    { label: "1h", value: 1 },
    { label: "4h", value: 4 },
    { label: "8h", value: 8 },
    { label: "12h", value: 12 },
    { label: "24h", value: 24 }
];  const minuteOptions = [
    { label: "00", value: 0 },
    { label: "30", value: 30 },
  ];

  const isFormFieldValid = (name) => !!(touched[name] && errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{errors[name]}</small>
      )
    );
  };

  return (
    <Dialog
      visible={props.deviceDialogVisible}
      onHide={props.handleCloseModalCB}
      header={props.editingDevice ? "Edit Device" : "Add Device"}
      modal
      style={{ width: "400px" }}
      footer={
        <Button
          label="Save"
          className="p-button-success"
          type="button"
          onClick={handleSubmit}
        />
      }
    >
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="field pt-4">
          <span className="p-float-label">
            <InputText
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={classNames({ "p-invalid": isFormFieldValid("name") })}
              disabled={props.editingDevice}
            />
            <label htmlFor="name">Device Name</label>
          </span>
          {getFormErrorMessage("name")}
        </div>

        <div className="field pt-3">
          <span className="p-float-label">
            <InputText
              id="consumption"
              name="consumption"
              value={values.consumption}
              onChange={handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("consumption"),
              })}
              suffix=" kWh"
            />
            <label htmlFor="consumption">Consumption per hour in kWh</label>
          </span>
          {getFormErrorMessage("consumption")}
        </div>
        <div className="field pt-3">
          <span className="p-float-label">
            <InputText
              id="durationHours"
              name="durationHours"
              value={values.durationHours}
              onChange={handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("durationHours"),
              })}
            />
            <label htmlFor="durationHours">Runtime: Hours</label>
          </span>
          {getFormErrorMessage("durationHours")}
        </div>

        <div className="field">
          <Dropdown
            id="durationMinutes"
            name="durationMinutes"
            value={props.formik.values.durationMinutes}
            options={minuteOptions}
            onChange={handleChange}
            optionLabel="label"
            optionValue="value"
            className={classNames({
              "p-invalid": isFormFieldValid("durationMinutes"),
            })}
            placeholder="Runtime: Minutes"
          />
          {getFormErrorMessage("durationMinutes")}
        </div>

        <div className="field">
          <Dropdown
            id="frequency"
            name="frequency"
            value={values.frequency}
            options={frequencyOptions}
            onChange={handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("frequency"),
            })}
            placeholder="Device runs every"
          />
          {getFormErrorMessage("frequency")}
        </div>
      </form>
    </Dialog>
  );
}
