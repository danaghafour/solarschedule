import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import LocationPresenter from "../presenters/locationPresenter";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SolarSetupPresenter from "../presenters/solarSetupPresenter";
import ElectricityPricePresenter from "../presenters/electicityPricePresenter";

export default function AccountOptions(props) {
    const handleLogOutCB = async () => {
        try {
            await signOut(auth);
        } catch (err){
            console.error(err);
        }
    };
    const [showLocation, setShowLocation] = useState(false);
    const [showSolarSetup, setShowSolarSetup] = useState(false);
    const [showElectricityPrice, setShowElectricityPrice] = useState(false);

    function handleCloseLocationCB() {
        setShowLocation(false);
    }

    function handleCloseSolarSetupCB() {
        setShowSolarSetup(false);
    }

    function handleCloseElectricityPriceCB() {
        setShowElectricityPrice(false);
    }

    return (
        <div>
            <Sidebar visible={props.accountSidebarActive} position="right" onHide={() => props.setAccountSidebarActive(false)} >
                <div className="flex flex-column justify-content-between h-full">
                    <div className="flex flex-column gap-3">
                        <Button icon="pi pi-map-marker" label="Location" className="w-full p-button-info" onClick={() => setShowLocation(true)} />
                        <Button icon="pi pi-sun" label="Solar Panel Setup" className="w-full p-button-info" onClick={() => setShowSolarSetup(true)} />
                        <Button icon="pi pi-dollar" label="Electricity Price" className="w-full p-button-info" onClick={() => setShowElectricityPrice(true)} />
                    </div>
                    <div>
                        <Button icon="pi pi-sign-out" label="Sign out" className="w-full p-button-info" severity="danger" onClick={handleLogOutCB} />
                    </div>
                </div>
            </Sidebar>
            <LocationPresenter model={props.model} showLocation={showLocation} handleCloseLocationCB={handleCloseLocationCB} />
            <SolarSetupPresenter model={props.model} showSolarSetup={showSolarSetup} handleCloseSolarSetupCB={handleCloseSolarSetupCB} />
            <ElectricityPricePresenter model={props.model} showElectricityPrice={showElectricityPrice} handleCloseElectricityPriceCB={handleCloseElectricityPriceCB} />

        </div>
    );
}
