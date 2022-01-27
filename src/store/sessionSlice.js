import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isLogged: false,
        user: null,
    },
    reducers:{
        start: (state, {payload}) => {
            state.isLogged = true;
            state.user = payload
            console.log("token==", state.token, state.roles)
            return state;
        },
        end: (state) => {
            state.isLogged = false;
            state.user = null;
            return state;
        }
    }
})

export const { start, end} = sessionSlice.actions
export default sessionSlice.reducer