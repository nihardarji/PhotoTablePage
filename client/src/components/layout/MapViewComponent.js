import React, { useState, useContext } from 'react'
import {  withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"
import { Modal, Button, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ImageContext from '../../contexts/images/imageContext'

const MapViewComponent =  withScriptjs(withGoogleMap(() => {
    const starting = { lat: -34.39699170447, lng: 150.64400134527 }
    const imageContext = useContext(ImageContext)
    const { displaySearchModal } = imageContext
    const [ displayModal , setDisplayModal ]= useState(false)
    const [latitude, setLatitude] = useState(starting.lat)
    const [longitude, setLongitude] = useState(starting.lng)
    
    const hideModal = () => {
        setDisplayModal(false)
    }
    
    const onCapture = () =>{
        hideModal()
        localStorage.setItem('lat',latitude)
        localStorage.setItem('lng',longitude)
        displaySearchModal(true)
    }
    
    const openModal = () => {
        setDisplayModal(true)
        console.log(displayModal);
    }
    
    const setCoordinates = (coordinates) => {
        openModal()
        setLatitude(coordinates.latLng.lat())
        setLongitude(coordinates.latLng.lng())
        console.log(displayModal);
    }
    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={starting}
            > 
                <Marker onClick={openModal} onDragEnd={(coordinates) => setCoordinates(coordinates)} position={starting} draggable	 />
            </GoogleMap>
            <Modal show={displayModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Get the coordinates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='no-gutters'>
                        Click capture below
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button className='btn btn-light' onClick={hideModal}>
                    Cancel
                </Button>
                <Link to='/' className='btn btn-info' onClick={onCapture}>
                    Capture
                </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
    }))

export default MapViewComponent
