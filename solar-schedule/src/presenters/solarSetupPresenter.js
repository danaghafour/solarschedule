import React from "react";
import { useFormik } from "formik";
import SolarSetup from "../Views/SolarSetup";

export default function SolarSetupPresenter(props) {
    const formik = useFormik({
        initialValues: {
            declination: props.model.solarSetup?.declination,
            azimuth: props.model.solarSetup?.azimuth,
            kwp: props.model.solarSetup?.kwp
        },
        enableReinitialize: true,
        validate: values => {
            const errors = {};
            if (!values.declination) {
                errors.declination = "Declination is required.";
            } else if (isNaN(values.declination)) {
                errors.declination = "Declination must be a number.";
            }

            if (!values.azimuth) {
                errors.azimuth = "Azimuth is required.";
            } else if (isNaN(values.azimuth)) {
                errors.azimuth = "Azimuth must be a number.";
            }

            if (!values.kwp) {
                errors.kwp = "kWp is required.";
            } else if (isNaN(values.kwp)) {
                errors.kwp = "kWp must be a number.";
            }

            return errors;
        },
        onSubmit: values => {
            props.model.editSolarSetup(
                parseFloat(values.declination),
                parseFloat(values.azimuth),
                parseFloat(values.kwp)
            );
            props.handleCloseSolarSetupCB();
        }
    });

    return (
        <SolarSetup
            model={props.model}
            showSolarSetup={props.showSolarSetup}
            handleCloseSolarSetupCB={props.handleCloseSolarSetupCB}
            formik={formik}
        />
    );
}
