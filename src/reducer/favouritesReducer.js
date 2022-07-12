import { createSlice } from '@reduxjs/toolkit';

const favouriteSlice = createSlice({
    name: "favourite",
    initialState: {
        favourite: [],
    },
    reducers: {
        save: (state, param) => {
            const { payload } = param;
            state.favourite = [...payload, ...state.favourite];
        },
    }
});
const { actions, reducer } = favouriteSlice
export const { save } = actions;
export default reducer;