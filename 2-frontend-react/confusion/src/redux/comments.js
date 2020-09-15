import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action ) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length; //assign an id in seq order based on existing comments
            comment.date = new Date().toISOString();
            return state.concat(comment); //create new object with added comment
        default: 
            return state;
    }
};