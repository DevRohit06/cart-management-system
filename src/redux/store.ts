import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, cartReducer)
export const store = configureStore({
    reducer: {
        allCart: persistedReducer,
    },

})
export const persistor = persistStore(store)