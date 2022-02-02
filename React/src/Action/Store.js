import { combineReducers ,createStore} from 'redux'

/* import MasterReducer from './reducers/MasterReducer'
import FilterReducer from './reducers/FilterReducer'
import UserReducer from './reducers/UserReducer'
 */
import PatientReducer from './Reducers/PatientReducer'
import HospetialReducer from './Reducers/HospitalReducer'
import VisistedReducer from './Reducers/VisistedReducer'
var store = createStore(combineReducers({
    /* masterdata : MasterReducer,
    filter : FilterReducer, */
    
    Hospitals :HospetialReducer,
    Patient:PatientReducer,
    Visited:VisistedReducer
}),{
    /* masterdata : { categories : [] , brands : [] , products : [] } ,
    filter : { categories : [] , brands : []  } , */
    Hospitals : { loginstatus : false , token : undefined,hospitalid: undefined},
    Patient : { loginstatus : false , token : undefined,patientid: undefined},
    Visited:{visitedata : undefined}

})

export default store