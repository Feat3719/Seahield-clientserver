import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage 사용

import rootReducer from "./index"; // rootReducer를 가져옵니다.

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // auth 상태만 localStorage에 저장
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);