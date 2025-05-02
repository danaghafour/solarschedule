import { useFormik } from "formik";
import ElectricityPrice from "../Views/ElectricityPrice";

const ElectricityPricePresenter = (props) => {
    const formik = useFormik({
        initialValues: {
            pricePerkwH: props.model.pricePerkwH || 0.00,
        },
        enableReinitialize: true,
        validate: values => {
            const errors = {};
            if (!values.pricePerkwH) {
                errors.pricePerkwH = "Electricity price is required.";
            } else if (values.pricePerkwH < 0) {
                errors.pricePerkwH = "Electricity price cannot be negative.";
            }
            return errors;
        },
        onSubmit: values => {
            props.model.editElectricityPrice(values.pricePerkwH);
            props.handleCloseElectricityPriceCB();
        },
    });

    return (
        <ElectricityPrice
            model={props.model}
            showElectricityPrice={props.showElectricityPrice}
            handleCloseElectricityPriceCB={props.handleCloseElectricityPriceCB}
            formik={formik}
        />
    );
};

export default ElectricityPricePresenter;
