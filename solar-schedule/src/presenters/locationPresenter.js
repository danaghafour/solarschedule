import React from "react";
import { useFormik } from "formik";
import Location from "../Views/Location";
import areCoordinatesInGermany from "../utils/checkCoordinates";

export default function LocationPresenter(props) {
    const formik = useFormik({
        initialValues: {
            latitude: props.model.latitude,
            longitude: props.model.longitude
        },
        enableReinitialize: true,
        validate: values => {
            const errors = {};

            if (!values.latitude) {
                errors.latitude = "Latitude required.";
            }
            if (values.latitude == 0) {
                errors.latitude = "Latitude must be a number different than 0.";
            }

            if (!values.longitude) {
                errors.longitude = "Longitude required.";
            }
            if (values.longitude == 0) {
                errors.longitude = "Longitude must be a number different than 0.";
            }

            if (values.latitude && values.longitude){
                if (!areCoordinatesInGermany(values.latitude, values.longitude)){
                    errors.longitude = "The coordinates are not in Germany";
                }
            }

            return errors;
        },
        onSubmit: (values) => {
            props.model.editLocation(
                parseFloat(values.latitude),
                parseFloat(values.longitude)
            );
            props.handleCloseLocationCB();
        }
    });

    return (
        <Location
            model={props.model}
            showLocation={props.showLocation}
            handleCloseLocationCB={props.handleCloseLocationCB}
            formik={formik}
        />
    );
}
