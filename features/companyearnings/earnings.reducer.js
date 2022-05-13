import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    monthly: [],
    yearly: [],
};
const earningsSlice = createSlice({
    name: 'earningsService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
        },
        getListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.monthly = payload.monthly;
            state.yearly = payload.yearly
        },
        getListsFailure: state => {
            state.loading = false;
            state.monthly = [];
            state.yearly = []
        },
    },
});

const earningsReducer = earningsSlice.reducer;
export default earningsReducer;
export const {
    getLoadingLists,
    getListsSuccess,getListsFailure

} = earningsSlice.actions;
