import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isUsername : "",
    isEmail : ""
}

const authMeSlice = createSlice({
    name : "authMe",
    initialState,
    reducers :{
        setIsUsername : (state, action) => {
            state.isUsername = action.payload
        },

        setIsEmail : (state, action) => {
            state.isEmail = action.payload
        }
    }
})

export const { setIsUsername, setIsEmail } = authMeSlice.actions

export default authMeSlice.reducer