import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./artapi";


export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware)=> {
        return getDefaultMiddleware().concat(articleApi.middleware)
    }
});