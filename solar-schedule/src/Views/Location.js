import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

export default function Location(props) {

    return (
        <Dialog
            visible={props.showLocation}
            onHide={() => {
                props.handleCloseLocationCB();
                props.formik.resetForm();
            }}
            header="Location Settings"
            modal
            style={{ width: "400px" }}
        >
            <form onSubmit={props.formik.handleSubmit} className="p-fluid">
                <div className="field pt-4">
                    <span className="p-float-label">
                        <InputNumber
                            id="latitude"
                            name="latitude"
                            value={props.formik.values.latitude}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0.0000 : e.value;
                                props.formik.setFieldValue("latitude", value);
                            }}
                            mode="decimal"
                            minFractionDigits={4}
                            maxFractionDigits={4}
                            min={0}
                        />
                        <label htmlFor="latitude">Latitude</label>
                    </span>
                    {props.formik.errors.latitude && <small className="p-error">{props.formik.errors.latitude}</small>}

                </div>

                <div className="field pt-3">
                    <span className="p-float-label">
                        <InputNumber
                            id="longitude"
                            name="longitude"
                            value={props.formik.values.longitude}
                            onChange={(e) => {
                                const value = e.value === null || e.value === "" ? 0.0000 : e.value;
                                props.formik.setFieldValue("longitude", value);
                            }}
                            mode="decimal"
                            minFractionDigits={4}
                            maxFractionDigits={4}
                            min={0}
                        />
                        <label htmlFor="longitude">Longitude</label>
                    </span>
                    {props.formik.errors.longitude && <small className="p-error">{props.formik.errors.longitude}</small>}
                </div>
                <Button
                    label="Save"
                    className="p-button"
                    type="submit"
                    onClick={props.formik.handleSubmit}
                    disabled={
                        props.formik.values.latitude === props.model.latitude &&
                        props.formik.values.longitude === props.model.longitude
                    }
                />
            </form>
        </Dialog>
    );
}
