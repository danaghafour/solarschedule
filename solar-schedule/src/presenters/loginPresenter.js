import Login from "../Views/Login";
import TitleAndIcon from "../Views/TitleAndIcon";
import { useFormik } from "formik";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/missing-password":
      return "Password is missing.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    case "auth/invalid-credential":
      return "The provided credential is invalid or has expired. Please try again with a valid credential.";
    default:
      return "An unknown error occurred. Please try again.";
  }
}

export default function LoginPresenter() {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required.";
      }

      if (!values.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (error) {
        console.log(error);
        const errorMessage = getErrorMessage(error.code);
        setErrors({ general: errorMessage });
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("");
    }
  };

  return (
    // <div className="loginPageCard flex flex-row row justify-content-center align-items-center">
    <div className="loginPageContainer">
      <Login
        formik={formik}
        handleGoogleLogin={handleGoogleLogin}
        navigateToSignup={navigateToSignup}
      />
    </div>
  );
}
