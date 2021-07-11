import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import placesReducer, { IPlacesState } from './places.state';


export interface ICombinedStates {
  places: IPlacesState
}

const rootReducer = combineReducers({
  places: placesReducer
})

const stateStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default stateStore;