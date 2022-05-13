import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    brands: [],
    brand: [],
    errors: false,
    saved: false
};
const brandSlice = createSlice({
    name: 'brandService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
            state.saved = false;
        },
        getBrandsListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = false;
            state.brands = payload;
            state.brand=[]
        },
        getBrandSuccess: (state, { payload }) => {
            state.brand = payload;
            state.saved = false;
            state.loading = false;
        },
        getBrandsListsFailure: state => {
            state.loading = false;
            state.saved = false;
            state.hasErrors = true;
            state.brands = [];
        },
        addBrandsuccess: (state) => {
            state.loading = false;
            state.saved = true;
        },
        deleteBrandsSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = false;
        },
        updateBrandsSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = true;
        }
    },
});

const brandReducer = brandSlice.reducer;
export default brandReducer;
export const {
    getLoadingLists,
    getBrandsListsFailure,
    getBrandsListsSuccess,
    addBrandsuccess,
    deleteBrandsSuccess,
    getBrandSuccess, updateBrandsSuccess
} = brandSlice.actions;
