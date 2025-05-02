import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

const ElectricityPrice = (props) => {
    return (
        <Dialog header="Edit Electricity Price" visible={props.showElectricityPrice}
            onHide={() => {
                props.handleCloseElectricityPriceCB();
                props.formik.resetForm();
            }}
            modal>
            <form onSubmit={props.formik.handleSubmit} className="p-fluid flex flex-column">
                <div className="p-field py-4">
                    <span className="p-float-label">
                        <InputNumber
                            id="pricePerkwH"
                            value={props.formik.values.pricePerkwH}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0 : e.value;
                                props.formik.setFieldValue("pricePerkwH", value);
                            }}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            min={0}
                            className={props.formik.errors.pricePerkwH ? "p-invalid" : ""}
                        />

                        <label htmlFor="pricePerkwH">Electricity Price (€/kWh)</label>
                    </span>
                    {props.formik.errors.pricePerkwH && <small className="p-error">{props.formik.errors.pricePerkwH}</small>}
                </div>
                <Button
                    type="submit"
                    label="Save"
                    className="p-button"
                    disabled={Number(props.formik.values.pricePerkwH) === props.model.pricePerkwH}
                />

            </form>
        </Dialog>
    );
};

export default ElectricityPrice;
