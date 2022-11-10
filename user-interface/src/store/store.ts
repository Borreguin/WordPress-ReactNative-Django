import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { loginPersistConfig } from "./slices/loginSlice";
import appReducer, { appPersistConfig } from "./slices/appSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

const store = configureStore({
  reducer: {
    // add persistReducer for those reducers that needs to persist their state:
    login: persistReducer(loginPersistConfig, loginReducer),
    app: persistReducer(appPersistConfig, appReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type according dispatch
export type AppDispatch = typeof store.dispatch;
