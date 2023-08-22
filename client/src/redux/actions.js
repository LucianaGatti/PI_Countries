import axios from 'axios';
import {
    GET_COUNTRIES_BY_ID,
    GET_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    GET_ACTIVITIES,
    FILTERED_BY_ACTIVITIES,
    POST_ACTIVITIES,
    FILTERED_BY_CONTINENT,
    ORDERED_BY_NAME,
    ORDERED_BY_POPULATION,
    CLEAN,
} from './types';


export const getAllCountries = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('http://localhost:3001/countries')
            const countries = apiData.data;
            dispatch({ type: GET_COUNTRIES, payload: countries });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const getCountriesByName = (name) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries?name=${name}`)
            const countryByName = apiData.data
            dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countryByName });
        } catch (error) {
            throw new Error(error);
        }
    };
}


export const getCountriesById = (id) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries/${id}`)
            const countryById = apiData.data
            dispatch({ type: GET_COUNTRIES_BY_ID, payload: countryById });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const orderByPopulation = (order) => {
    return { type: ORDERED_BY_POPULATION, payload: order }
}

export const orderByName = (order) => {
    return { type: ORDERED_BY_NAME, payload: order }
}

export const filterByContinent = (payload) => {
    return { type: FILTERED_BY_CONTINENT, payload: payload }
}

export const filterByActivities = (activities) => {
    return { type: FILTERED_BY_ACTIVITIES, payload: activities }
}

export const getAllActivities = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('http://localhost:3001/activity')
            const allActivities = apiData.data
            dispatch({ type: GET_ACTIVITIES, payload: allActivities });
        } catch (error) {
            throw new Error("Could not get activities data");
        }
    };
}

export function postActivity(payload) {
    return async function () {
        try {
            const apiData = await axios.post("http://localhost:3001/activity", payload);
            return {
                type: POST_ACTIVITIES,
                payload: apiData,

            };
        } catch (error) {
            alert(error)

        }
    };
}
export const Clean = (payload) => {
    return {
        type: CLEAN,
        payload: payload,
    };
};



