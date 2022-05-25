import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: false
    },
    reducers: {
        changeUser(state, action){
            state.user = action.payload 
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice