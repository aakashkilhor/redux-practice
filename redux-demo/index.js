const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')
const applyMiddleware = redux.applyMiddleware

const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
        return {
            ...state,
            numOfCakes:state.numOfCakes + action.payload
        }
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams:state.numOfIceCreams-1,
      };
    case ICECREAM_RESTOCKED:
        return {
            ...state,
            numOfIceCreams :state.numOfIceCreams + action.payload
        }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer,applyMiddleware(logger));

const actions = bindActionCreators({orderCake,restockCake,orderIceCream,restockIceCream},store.dispatch)

console.log('Initial',store.getState());

// const unsubscribe = store.subscribe(()=>console.log('New',store.getState()));

actions.orderCake()
actions.orderCake()
actions.orderIceCream()
actions.orderIceCream()
store.dispatch(restockCake(2));
store.dispatch(restockIceCream(2));
// unsubscribe()
