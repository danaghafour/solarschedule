import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Settings = (props) => {
    const [showLocation, setShowLocation] = useState(false);
    const [showSolarSetup, setShowSolarSetup] = useState(false);
    const [showElectricityPrice, setShowElectricityPrice] = useState(false);

    const [newLatitude, setNewLatitude] = useState(props.latitude);
    const [newLongitude, setNewLongitude] = useState(props.longitude);

    // the initial values are loaded from firebase, which can take some time
    useEffect(() => {
        setNewLatitude(props.latitude);
        setNewLongitude(props.longitude);
    }, [props.latitude, props.longitude]);

    const [newDeclination,setNewDeclination]=useState(props.solarSetup.declination);
    const [newAzimuth,setNewAzimuth]=useState(props.solarSetup.azimuth);
    const [newKwp,setNewKwp]=useState(props.solarSetup.kwp);

    useEffect(()=>{
        setNewDeclination(props.solarSetup.declination);
        setNewAzimuth(props.solarSetup.azimuth);
        setNewKwp(props.solarSetup.kwp);
    },[props.solarSetup.declination,props.solarSetup.azimuth,props.solarSetup.kwp]);

    const [newPricePerkwH, setNewPricePerkwH]=useState(props.pricePerkwH);

    useEffect(()=>{
        setNewPricePerkwH(props.pricePerkwH);
    },[props.pricePerkwH]);

    const toggleLocation = () => setShowLocation(!showLocation);
    const toggleSolarSetup = () => setShowSolarSetup(!showSolarSetup);
    const toggleElectricityPrice = () =>
        setShowElectricityPrice(!showElectricityPrice);

    function closeSidebarCB() {
        // reset inputs
        setNewLatitude(props.latitude);
        setNewLongitude(props.longitude);
        setNewDeclination(props.solarSetup.declination);
        setNewAzimuth(props.solarSetup.azimuth);
        setNewKwp(props.solarSetup.kwp);
        props.setAccountSidebarActive(false);
    }

    return (
        <div className={`sidebar p-3 right-sidebar-container settings-container ${props.accountSidebarActive ? "active" : ""}`} >
            <div className='flex justify-content-between'>
                <h2>Settings</h2>
                <Button className="p-sidebar-close" icon="pi pi-times" rounded text onClick={closeSidebarCB} aria-label="Close" severity='secondary' />
            </div>
            <div className="settings-icon" onClick={toggleLocation}>
                Location
            </div>
            {showLocation && (
                <div className="settings-topic">
                    <label>Latitude:</label>
                    <InputText
                        value={newLatitude}
                        onChange={e => setNewLatitude(parseFloat(e.target.value))}
                    />
                    <label>Longitude:</label>
                    <InputText
                        value={newLongitude}
                        onChange={e => setNewLongitude(parseFloat(e.target.value))}
                    />
                    <Button disabled={newLatitude === props.latitude && newLongitude === props.longitude} label="Save" onClick={() => props.handleEditLocation(newLatitude, newLongitude)} />
                </div>
            )}

            <div className="settings-icon" onClick={toggleSolarSetup}>
                Solar Setup
            </div>
            {showSolarSetup && (
                <div className="settings-topic">
                    <label>Declination:</label>
                    <InputText
                        value={newDeclination}
                        onChange={(e) => setNewDeclination(parseFloat(e.target.value))}
                    />
                    <label>Azimuth:</label>
                    <InputText
                        value={newAzimuth}
                        onChange={(e) => setNewAzimuth(parseFloat(e.target.value))}
                    />
                    <label>kwp:</label>
                    <InputText
                        value={newKwp}
                        onChange={(e) => setNewKwp(parseFloat(e.target.value))}
                    />
                    <Button disabled={newDeclination === props.solarSetup.declination && newAzimuth === props.solarSetup.azimuth && newKwp===props.solarSetup.kwp} label="Save" onClick={() => props.handleEditSolarSetup(newDeclination, newAzimuth,newKwp)} />
                </div>
            )}

            <div className="settings-icon" onClick={toggleElectricityPrice}>
                Electricity Price
            </div>
            {showElectricityPrice && (
                <div className="settings-topic">
                    <label>Price per kWh:</label>
                    <InputText
                        value={newPricePerkwH}
                        onChange={(e) => setNewPricePerkwH(parseFloat(e.target.value))}
                    />
                    <Button disabled={newPricePerkwH===props.pricePerkwH} label="Save" onClick={() => props.handleEditElectricityPriceCB(newPricePerkwH)} />
                </div>
            )}
        </div>
    );
};

export default Settings;
