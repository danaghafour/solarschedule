import SignUp from "../Views/SignUp.js";
import TitleAndIcon from "../Views/TitleAndIcon";
import { useFormik } from "formik";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpPresenter() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/");
    };
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords must match";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate,
        onSubmit: async (values, { setErrors }) => {
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password);
                navigateToLogin();
            } catch (error) {
                console.log(error);
                const errorMessage = getErrorMessage(error.code);
                setErrors({ general: errorMessage });
            }
        }
    });

    return (
        <div className="loginPageContainer">
            <SignUp formik={formik} navigateToLogin={navigateToLogin} />
        </div>
    );
}

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "The email address is invalid.";
        case "auth/email-already-in-use":
            return "The email address is already in use by another account.";
        case "auth/weak-password":
            return "The password is too weak. Please use a stronger password.";
        case "auth/network-request-failed":
            return "Network error. Please check your internet connection and try again.";
        default:
            return "An unknown error occurred. Please try again.";
    }
}

