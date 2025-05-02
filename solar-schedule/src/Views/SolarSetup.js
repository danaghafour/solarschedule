import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

export default function SolarSetup(props) {


    return (
        <Dialog
            visible={props.showSolarSetup}
            onHide={() => {
                props.handleCloseSolarSetupCB();
                props.formik.resetForm();
            }}
            header="Solar Setup Settings"
            modal
            style={{ width: "400px" }}
        >
            <form onSubmit={props.formik.handleSubmit} className="p-fluid flex flex-column gap-3 pt-4">
                <div className="field">
                    <span className="p-float-label">
                        <InputNumber
                            id="declination"
                            name="declination"
                            value={props.formik.values.declination}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0 : e.value;
                                props.formik.setFieldValue("declination", value);
                            }}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            min={0}
                            max={90}
                            onBlur={props.formik.handleBlur}
                        />
                        <label htmlFor="declination">Declination</label>
                    </span>
                    {props.formik.errors.declination && <small className="p-error">{props.formik.errors.declination}</small>}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <InputNumber
                            id="azimuth"
                            name="azimuth"
                            value={props.formik.values.azimuth}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0 : e.value;
                                props.formik.setFieldValue("azimuth", value);
                            }}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            onBlur={props.formik.handleBlur}
                            min={0}
                        />
                        <label htmlFor="azimuth">Azimuth</label>
                    </span>
                    {props.formik.errors.azimuth && <small className="p-error">{props.formik.errors.azimuth}</small>}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <InputNumber
                            id="kwp"
                            name="kwp"
                            value={props.formik.values.kwp}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0 : e.value;
                                props.formik.setFieldValue("kwp", value);
                            }}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            onBlur={props.formik.handleBlur}
                            min={0}
                        />
                        <label htmlFor="kwp">kWp</label>
                    </span>
                    {props.formik.errors.kwp && <small className="p-error">{props.formik.errors.kwp}</small>}
                </div>
                <Button
                    label="Save"
                    className="p-button"
                    type="submit"
                    onClick={props.formik.handleSubmit}
                    disabled={
                        props.formik.values.declination == props.model?.solarSetup?.declination &&
                        props.formik.values.azimuth == props.model?.solarSetup?.azimuth &&
                        props.formik.values.kwp == props.model?.solarSetup?.kwp
                    }
                />
            </form>
        </Dialog>
    );
}
