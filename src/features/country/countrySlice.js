import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://restcountries.com/v3.1/all';

const initialState = {
    isLoading: true,
    countries: [],
    errorMsg: ''
}

export const getAllCountries = createAsyncThunk('getAllCountries', async (_, thunkAPI) => {
    try {
        const {data} = await axios.get(url);
        console.log(data)
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong. Please try again later');
    }
})

const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCountries.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(getAllCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload;
        }).addCase(getAllCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload
        })
    }
});

export default countrySlice.reducer;
