import {configureStore} from "@reduxjs/toolkit";
import countrySlice from "./features/country/countrySlice";

const store = configureStore({
    reducer: {
        country: countrySlice
    }
});

export default store;