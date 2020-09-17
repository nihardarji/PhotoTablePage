import React, { useReducer } from 'react';
import ImageContext from './imageContext';
import imageReducer from './imageReducer';
import axios from 'axios'
import { 
    GET_IMAGE_DATA,
    GET_IMAGE_ERROR,
    SHOW_SEARCH_MODAL
} from '../types';

const ImageState = props => {
    const initialState = {
        imageList: null,
        showSearchModal: false,
        error: null
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState)

    const getImagesData = async (lat,lng,dis) => {

        try {
            const res = await axios.get(`/api/imagesList/${lat}/${lng}/${dis}`)

            dispatch({ 
                type: GET_IMAGE_DATA, 
                payload: res.data 
            })
            
        } catch (error) {
            dispatch({ 
                type: GET_IMAGE_ERROR, 
                payload: error.response
            })
        }
        
    }
    const filterImages = async (query) => {
        try {
            const res = await axios.get(`/api/imagesList?q=${query}`)

            dispatch({ 
                type: GET_IMAGE_DATA, 
                payload: res.data 
            })
            
        } catch (error) {
            dispatch({ 
                type: GET_IMAGE_ERROR, 
                payload: error.response
            })
        }
        
    }

    const displaySearchModal = setShow => {
            dispatch({ 
                type: SHOW_SEARCH_MODAL, 
                payload: setShow 
            })
    }

    return (
        <ImageContext.Provider
        value = {{
            imageList: state.imageList,
            showSearchModal: state.showSearchModal,
            error: state.error,
            getImagesData,
            displaySearchModal,
            filterImages
        }}>
            { props.children }
        </ImageContext.Provider>
    )
}

export default ImageState