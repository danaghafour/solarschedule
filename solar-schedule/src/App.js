import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Layout from "./Views/Layout";
import LoginPresenter from "./presenters/loginPresenter";
import SignUpPresenter from "./presenters/signUpPresenter";
import SchedulePresenter from "./presenters/schedulePresenter";
import { connectToFirebase } from "./firebaseModel";
import { reaction } from "mobx";

export default observer( function App(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // In your App component

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            if (!user) {
                props.model.reset();
            } else {
                connectToFirebase(props.model, reaction);
            }
        });

        return () => unsubscribe();
    }, [props.model]);

    const getRouter = () => {
        const routes = isAuthenticated ? [
            {
                path: "/",
                element: <Layout model={props.model}/>,
                children: [
                    {
                        path: "/",
                        element: <SchedulePresenter model={props.model}/>,
                    }
                ]
            }
        ] : [
            { path: "/", element: <LoginPresenter /> },
            { path: "/signup", element: <SignUpPresenter /> }
        ];

        return createBrowserRouter(routes);
    };

    // loader functions will be called inmediatly when createBrowserRouter is called, if the route is correct
    // to prevent failing because we have no auth-data, defer the router creation to the mounting of the app component
    const [routerInfo, setRouterInfo] = useState({ router: null, idx: 0 });

    useEffect(() => {
        const router = getRouter();
        setRouterInfo((ri) => ({ router, idx: (ri.idx + 1) }));

        // we need to clear the memory of the previous router
        return () => router.dispose();
    }, [isAuthenticated]);

    if (!routerInfo.router) return null;
    return (
        <RouterProvider
            key={routerInfo.idx} router={routerInfo.router} fallbackElement={
                <div>
                    ...
                </div>
            }
        />
    );
});
