import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    earnings: [],
    errors: false,
};
const earningSlice = createSlice({
    name: 'earningService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
        },
        getEarningsListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.earnings = payload;
        },
        getEarningsListsFailure: state => {
            state.loading = false;
            // state.earnings = [];
        },
    },
});

const earningsReducer = earningSlice.reducer;
export default earningsReducer;
export const {
    getLoadingLists,getEarningsListsFailure,
    getEarningsListsSuccess,
} = earningSlice.actions;
