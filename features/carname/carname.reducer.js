import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    carnames: [],
    carnamebyBrand: [],
    carname: [],
    errors: false,
    saved: false
};
const carnameSlice = createSlice({
    name: 'carnameService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
            state.saved = false;
        },
        getCarNameListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = false;
            state.carnames = payload;
            state.carname=[]
        },
        getCarNameSuccess: (state, { payload }) => {
            state.carname = payload;
            state.saved = false;
            state.loading = false;
        },
        getCarNameBrandSuccess: (state, { payload }) => {
            state.carnamebyBrand = payload;
            state.saved = false;
            state.loading = false;
        },
        getCarNameListsFailure: state => {
            state.loading = false;
            state.saved = false;
            state.hasErrors = true;
            state.carnames = [];
            state.carnamebyBrand = [];
        },
        addCarNameSuccess: (state) => {
            state.loading = false;
            state.saved = true;
        },
        deleteCarNameSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = false;
        },
        updateCarNameSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = true;
        }
    },
});

const carnameReducer = carnameSlice.reducer;
export default carnameReducer;
export const {
    getLoadingLists,
    getCarNameListsFailure,
    getCarNameListsSuccess,
    addCarNameSuccess,
    deleteCarNameSuccess,
    getCarNameSuccess, updateCarNameSuccess,getCarNameBrandSuccess
} = carnameSlice.actions;
