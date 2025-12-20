import { Provider } from 'react-redux';
import { store } from '../Redux/store'; 
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// Import du store
// Provider permet de partager le store à tous les composants
//


const persistConfig = { key: "HackaTwwet", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Component {...pageProps} />
       </PersistGate>
    </Provider>
  );
}

export default MyApp;