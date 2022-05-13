import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    supportsUsers: [],
    errors: false,
    saved: false
};
const supportSlice = createSlice({
    name: 'supportService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
            state.saved = false;
        },
        getSupportsListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.saved = false;
            state.supportsUsers = payload;
        },
        getSupportsListsFailure: state => {
            state.loading = false;
            state.saved = false;
            state.hasErrors = true;
            state.supportsUsers=[]
        },
        addSupportSuccess: (state) => {
            state.loading = false;
            state.saved = true;
        },
        deleteSupportSuccess:  (state, { payload })=> {
            state.loading = false;
            state.saved = false;
        },
    },
});

const supportReducer = supportSlice.reducer;
export default supportReducer;
export const {
    getLoadingLists,
    getSupportsListsFailure,
    getSupportsListsSuccess,
    addSupportSuccess,
    deleteSupportSuccess
} = supportSlice.actions;
