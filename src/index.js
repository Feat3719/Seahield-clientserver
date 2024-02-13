import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reducers/store";
import App from "./App";
// import AuthManager from "./reducers/AuthManager";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <AuthManager /> */}
            <App />
        </PersistGate>
    </Provider>
);
