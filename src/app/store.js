import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import storage from "redux-persist/lib/storage";
import { cryptoNewsApi } from "../services/cryptoNews";
import { persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";

// const persistConfig = {
//   key: "favourite",
//   storage,
//   whiteList: [], //
// };

// const reducers =combineReducers{

// }

// const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: {
    // persistedReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
