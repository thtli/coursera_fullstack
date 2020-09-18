import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        errMess: null,
        comments: []
    }, action ) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length; //assign an id in seq order based on existing comments
            comment.date = new Date().toISOString();
            return { ...state, comments: state.comments.concat(comment) }; //create new object with added comment
        
        default: 
            return state;
    }
};