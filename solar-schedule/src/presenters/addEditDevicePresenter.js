import AddEditDevice from "../Views/AddEditDevice";
import { useFormik } from "formik";

export default function AddEditDevicePresenter(props) {
   const formik = useFormik({
        initialValues: {
            name: props.editingDevice?.name || "",
            consumption: props.editingDevice?.consumptionPerHour || "",
            durationHours: props.editingDevice? Math.floor(props.editingDevice.durationHours) : "",
            durationMinutes: props.editingDevice? props.editingDevice?.durationMinutes || 0 : "",
            frequency: props.editingDevice? props.editingDevice?.frequency || 0 : ""
        },
        enableReinitialize: true, 
        validate: values => {
            const errors = {};

            if (!values.name.trim()) {
                errors.name = "Name is required.";
            }

            if (!props.editingDevice && !props.model.isDeviceNameUnique(values.name)){
                errors.name ="Name must be unique.";
            }

            if (!values.consumption) {
                errors.consumption = "Consumption per hour is required.";
            } else if (isNaN(values.consumption) || parseInt(values.consumption) <= 0) {
                errors.consumption = "Consumption must be a positive number.";
            } else if (parseInt(values.consumption) > 1000000) {
                errors.consumption = "Lets be realistic and stay below 1 Gigawatt.";
            }
            
            if (!values.durationHours) {
                errors.durationHours = "Hours is required.";
            } else if (isNaN(values.durationHours) || parseInt(values.durationHours) < 0) {
                errors.durationHours = "Hours must be a non-negative number.";
            }

            if (values.durationMinutes === undefined || values.durationMinutes === null) {
                errors.durationMinutes = "Minutes is required.";
            }

            if (!values.frequency) {
                errors.frequency = "Frequency is required.";
            }
            if(parseInt(values.frequency) < parseInt(values.durationHours) + ((parseInt(values.durationMinutes)==30? 0.5 :0))){
                errors.frequency = "Frequency must be longer than runtime";
            }

            return errors;
        },

        onSubmit: (values, { resetForm }) => {
            if (props.editingDevice) {
                const minutes = values.durationMinutes || 0;
                props.model.editDevice(
                    props.editingDevice.name,
                    values.consumption,
                    Math.floor(values.durationHours),
                    minutes,
                    values.frequency
                );
            } else {
                props.model.addDevice(
                    values.name,
                    values.consumption,
                    values.durationHours,
                    values.durationMinutes,
                    values.frequency
                );
            }
            props.setDeviceDialogVisible(false);
            props.setEditingDevice(null); 
            values=null;
            resetForm();
        },
    });

    function handleCloseModalCB(){
        props.setDeviceDialogVisible(false);
        props.setEditingDevice(null); 
        formik.resetForm();
    }

    return (
        <AddEditDevice formik={formik} handleCloseModalCB={handleCloseModalCB} {...props} />
    );
}
