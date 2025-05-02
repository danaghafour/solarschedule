import History from "../Views/History";
import { observer } from "mobx-react-lite";

export default observer(function HistoryPresenter(props) {
    const history = [
        {
            title: "This Week",
            electricityCost: props.model.history.week.totalElectricityPrice,
            co2: props.model.history.week.totalCO2,
            averagePricePerkwh: props.model.history.week.averageElectricityPrice,
            averageCO2Perkwh: props.model.history.week.averageCO2,
        },
        {
            title: "This Month",
            electricityCost: props.model.history.month.totalElectricityPrice,
            co2: props.model.history.month.totalCO2,
            averagePricePerkwh: props.model.history.month.averageElectricityPrice,
            averageCO2Perkwh: props.model.history.month.averageCO2,
        },
        {
            title: "This Year",
            electricityCost: props.model.history.year.totalElectricityPrice,
            co2: props.model.history.year.totalCO2,
            averagePricePerkwh: props.model.history.year.averageElectricityPrice,
            averageCO2Perkwh: props.model.history.year.averageCO2,
        },
    ];

    function closeHistory(){
        props.setHistorySidebarActive(false);
    }


    return (
        <History
            history={history}
            closeHistory={closeHistory}
            historySidebarActive={props.historySidebarActive}
        />
    );
});


