import { combineReducers ,createStore} from 'redux'

/* import MasterReducer from './reducers/MasterReducer'
import FilterReducer from './reducers/FilterReducer'
import UserReducer from './reducers/UserReducer'
 */
import HospetialReducer from './Reducers/HospitalReducer'
var store = createStore(combineReducers({
    /* masterdata : MasterReducer,
    filter : FilterReducer, */
    Hospitals :HospetialReducer
}),{
    /* masterdata : { categories : [] , brands : [] , products : [] } ,
    filter : { categories : [] , brands : []  } , */
    Hospitals : { loginstatus : false , token : undefined,hospitalid: undefined}
})

export default store