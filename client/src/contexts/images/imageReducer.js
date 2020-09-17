import { 
    GET_IMAGE_DATA,
    GET_IMAGE_ERROR,
    SHOW_SEARCH_MODAL
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_IMAGE_DATA:
            return {
                ...state,
                imageList: action.payload
            }

        case GET_IMAGE_ERROR:
            return {
                ...state,
                error: action.payload
            }
            
        case SHOW_SEARCH_MODAL:
            console.log('asdf',action.payload);
            return {
                ...state,
                showSearchModal: action.payload
            }
        default:
            return state
    }
}