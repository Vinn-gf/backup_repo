import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token : undefined,
}

const authLoginOAuthSlice = createSlice({
    name : "loginOAuth",
    initialState,
    reducers :{
        setToken : (state, action) => {
            state.token = action.payload
        },
    }

})

export const {setToken} = authLoginOAuthSlice.actions

export default authLoginOAuthSlice.reducer