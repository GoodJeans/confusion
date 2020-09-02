import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './forms';
import {createForms} from 'react-redux-form'
import { FeedBack }  from './feedback';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            feedBack: FeedBack,
            ...createForms({ 
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)

    );
    return store;
}
