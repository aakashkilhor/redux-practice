const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCakes : 10
}

// Defining action types and constants action object action creator and immutable state handling
// and switch statement in reducer
const cakeSlice = createSlice({
    name:'cake',
    // Specify initial state as key and values but javascript is smart
    initialState ,
    reducers: {
        ordered : (state) => {
            state.numOfCakes--
        },
        restocked:(state,action)=>{
            state.numOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions