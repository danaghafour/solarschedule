import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";

export default function Login(props) {
    const { values, handleChange, handleSubmit, errors, touched } = props.formik;

    const isFormFieldValid = (name) => !!(touched[name] && errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{errors[name]}</small>;
    };

    // The unicode code character seems to only work on Windows, use a normal letter instead on other systems
    const sunIcon=globalThis.window.navigator.appVersion.indexOf("Windows") === -1 ? "o" : "🌣";

    return (
        <div className="min-h-screen flex align-items-center justify-content-center">
            <div className="loginPageCard">
                <div className="loginLeft ">
                    <Image className="loginLogo" src="/icon-no-bg.png" alt="Image" width="45rem" />
                    <p className="loginPageTitle">S{sunIcon}lar<br />schedule</p>
                    <p className="loginPageSubtitle">Schedule your devices based on the production forecast for your solar system.</p>
                    <Image className="scrollDownIcon" width="35rem" src="/scroll-down-icon.png" alt="scroll down"/>
                </div>
                <div className="loginRigth">
                    <div className="loginCard border-1 surface-border surface-card p-3">
                        <h3 className="text-center">Login</h3>
                        <form onSubmit={handleSubmit} className="p-fluid flex flex-column gap-2">

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        id="email"
                                        name="email"
                                        autoComplete="username"
                                        value={values.email}
                                        onChange={handleChange}
                                        className={classNames({ "p-invalid": isFormFieldValid("email") })}
                                    />
                                    <label htmlFor="email" className={classNames({ "p-error": isFormFieldValid("email") })}>Email*</label>
                                </span>
                                {getFormErrorMessage("email")}
                            </div>

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-lock" />
                                    <InputText
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        onChange={handleChange}
                                        className={classNames({ "p-invalid": isFormFieldValid("password") })}
                                    />
                                    <label htmlFor="password" className={classNames({ "p-error": isFormFieldValid("password") })}>Password*</label>
                                </span>
                                {getFormErrorMessage("password")}
                            </div>

                            {props.formik.errors.general &&
                                <div className="p-error mb-4">
                                    {props.formik.errors.general}
                                </div>
                            }

                            <Button label="Login" className="w-full" type="submit" />
                            <Button label="Login with Google" className="w-full mt-4" icon="pi pi-google" type="button" onClick={props.handleGoogleLogin} />


                        </form>

                    </div>
                    <div className="text-center mt-4">
                        <span>{"Don't have an account?  "}</span>
                        <a className="text-600 cursor-pointer hover:text-primary transition-colors transition-duration-300" onClick={props.navigateToSignup}>
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
