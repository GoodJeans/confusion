import * as ActionTypes from  './ActionTypes';

export const FeedBack = ( state ={
    feedback: [],
    errMess: null

}, action ) => {
    switch(action.types){
        case ActionTypes.ADD_FEEDBACK:
            return {...state, errMess: null, feedback: action.payload};
        
        case ActionTypes.FEEDBACK_FAILED:
            return {...state, errMess: action.payload, feedback: null};
        
        default:
            return state;
    }

}
