import Settings from "../Views/Settings";
import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";

export default observer(function AccountSettingsPresenter(props) {

    const handleEditLocationCB = useCallback(
        async (latitude, longitude) => {
            try{
                props.model.editLocation(latitude, longitude);
            } catch (error){
                //todo show error message
            }
        },
        [props.model.editLocation]
    );

    const handleEditSolarSetupCB = useCallback(
        async (declination, azimuth, kwp) => {
            props.model.editSolarSetup(declination, azimuth, kwp);
        },
        [props.model.editSolarSetup]
    );

    const handleEditElectricityPriceCB = useCallback(
        async (price) => {
            props.model.editElectricityPrice(price);
        },
        [props.model.editElectricityPrice]
    );

    return (
        <Settings setAccountSidebarActive={props.setAccountSidebarActive}
            accountSidebarActive={props.accountSidebarActive}
            handleEditLocation={handleEditLocationCB}
            handleEditSolarSetup={handleEditSolarSetupCB}
            handleEditElectricityPrice={handleEditElectricityPriceCB}
            latitude={props.model.latitude}
            longitude={props.model.longitude}
            solarSetup={{...props.model.solarSetup}}
            pricePerkwH={props.model.pricePerkwH} />
    );
});
