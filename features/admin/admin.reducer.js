import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    admins: [],
    errors: false
};
const adminSlice = createSlice({
    name: 'adminService',
    initialState,
    reducers: {
        getLoadingLists: state => {
            state.loading = true;
            state.saved = false;
        },
        getAdminsListsSuccess: (state, { payload }) => {
            state.loading = false;
            state.admins = payload;
            state.saved = false;
        },
        getAdminsListsFailure: state => {
            state.loading = false;
            state.saved = false;
            state.hasErrors = true;
            state.admins = [];
        },
        addAdminSuccess: (state) => {
            state.loading = false;
            state.saved = true;
        },
        deleteAdminSuccess: (state) => {
            state.loading = false;
            state.saved = false;

        }
    },
});

const adminReducer = adminSlice.reducer;
export default adminReducer;
export const {
    getLoadingLists,
    getAdminsListsFailure,
    getAdminsListsSuccess,
    addAdminSuccess,
    deleteAdminSuccess
} = adminSlice.actions;
