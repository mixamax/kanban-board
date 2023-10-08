import { Provider } from "react-redux";
import { store, persistor } from "../../6_shared/store/index";
import { PersistGate } from "redux-persist/integration/react";

export const withProvider = (component) => () =>
    (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {component()}
            </PersistGate>
        </Provider>
    );
