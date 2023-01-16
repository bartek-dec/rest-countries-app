import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://restcountries.com/v3.1';

const initialState = {
    isLoading: true,
    countries: [],
    errorMsg: '',
    region: '',
    name: ''
}

export const getAllCountries = createAsyncThunk('getAllCountries', async (_, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/all`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong. Please try again later');
    }
});

export const filterCountriesByRegion = createAsyncThunk('filterCountriesByRegion', async (region, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/region/${region}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong. Please try again later');
    }
});

export const findCountryByName = createAsyncThunk('findCountryByName', async (name, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/name/${name}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong. Please try again later');
    }
})

const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCountries.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(getAllCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload;
        }).addCase(getAllCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload;
        }).addCase(filterCountriesByRegion.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(filterCountriesByRegion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload;
        }).addCase(filterCountriesByRegion.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload;
        }).addCase(findCountryByName.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(findCountryByName.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload;
        }).addCase(findCountryByName.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload;
        })
    }
});

export const {setRegion, setName} = countrySlice.actions;

export default countrySlice.reducer;
