import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import storage from "redux-persist/lib/storage";
import { cryptoNewsApi } from "../services/cryptoNews";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, } from "redux-persist";
// import thunk from "redux-thunk";
import favReducer from "../reducer/favouritesReducer";



const persistConfig = {
  key: "fav",
  storage,
  whiteList: ['favourite'],
};

const reducers = combineReducers({
  // someSlice,
  favReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
})


const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(cryptoApi.middleware)
});
export let persistor = persistStore(store);


