import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://restcountries.com/v3.1';

const initialState = {
    isLoading: true,
    countries: [],
    errorMsg: '',
    region: '',
    singleCountry: {},
}

export const getAllCountries = createAsyncThunk('getAllCountries', async (_, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/all`);
        return data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('Not Found.');
    }
});

export const filterCountriesByRegion = createAsyncThunk('filterCountriesByRegion', async (region, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/region/${region}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Not Found.');
    }
});

export const findCountriesByName = createAsyncThunk('findCountryByName', async (name, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/name/${name}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Not Found.');
    }
});

export const getSingleCountry = createAsyncThunk('getSingleCountry', async (id, thunkAPI) => {
    try {
        const {data} = await axios.get(`${url}/alpha/${id}`);

        const country = data[0];
        const flag = country.flags.svg;
        const countryName = country.name.common;
        const nativeName = Object.values(country.name.nativeName)[0].common;
        const currencies = Object.values(country.currencies)[0].name;
        const languages = Object.values(country.languages).join(', ');
        const {population, region, subregion, capital, tld} = country;
        const map = country.maps.googleMaps;

        const singleCountry = {
            flag, countryName, nativeName, currencies, languages, population, region, subregion,
            capital, tld, map
        };

        let borders = data[0].borders;

        if (borders) {
            borders = borders.toString();
            const neighbours = await axios.get(`${url}/alpha?codes=${borders}`);

            return {...singleCountry, neighbours: neighbours.data};
        }
        return {...singleCountry, neighbours: []};
    } catch (error) {
        return thunkAPI.rejectWithValue('Not Found.');
    }
});

const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCountries.pending, (state) => {
            state.countries = [];
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
        }).addCase(findCountriesByName.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(findCountriesByName.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload;
        }).addCase(findCountriesByName.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload;
        }).addCase(getSingleCountry.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = '';
        }).addCase(getSingleCountry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singleCountry = action.payload;
        }).addCase(getSingleCountry.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload;
        })
    }
});

export const {setRegion} = countrySlice.actions;

export default countrySlice.reducer;
