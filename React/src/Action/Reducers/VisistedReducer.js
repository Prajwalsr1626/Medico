import * as actionType from '../ActionTypes'

export default function VisistedReducer(state={},action)
{
    switch(action.type)
    {
        case actionType.VISITED_DATA: return {
                                ...state, 
                                visitedata : action.payload.visitedata,
                                }
              
        default: return state                                
    }
}   