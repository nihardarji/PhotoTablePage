import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import ImageContext from '../contexts/images/imageContext'


const SearchModal = () => {
    const imageContext = useContext(ImageContext)
    const [distance, setDistance] = useState('')
   
    const hideModal = () => {
        localStorage.clear()
        setDistance('')
        imageContext.displaySearchModal(false)
    }
    
    const latitude = localStorage.getItem('lat')
    const longitude = localStorage.getItem('lng')
    
    const onSearch = (e) => {
        e.preventDefault()
        imageContext.getImagesData(latitude, longitude, distance)
        hideModal()
    }
    return (
        <Modal show={imageContext.showSearchModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Get the coordinates</Modal.Title>
                </Modal.Header>
                <Modal.Body className='show-grid'>
                <h4 className = 'mb-4'>Advanced search for pictures</h4>
                <Container className = 'my-2'>
                    <Row className = 'my-2'>
                        <Col md={3} className='p-0'>
                            Coordinates
                        </Col>
                        <Col md={7}>
                            <input id="coordinates" type="text" class="form-control" value={latitude && longitude ?latitude+ ',' + longitude : ''} required/>
                        </Col>
                        <Col md={2}>
                        <Link to='/maps' type='button' class="btn btn-info" onClick={hideModal}>Get</Link>
                        </Col>
                    </Row>

                    <Row className = 'my-2'>
                        <Col xs={3} className='p-0'>
                            Search Radius(feet)
                        </Col>
                        <Col xs={9}>
                        <input id="radius" value={distance} onChange={e => setDistance(e.target.value)} type="text" class="form-control" required/>
                        </Col>
                    </Row>
                </Container>
                <div className='d-flex justify-content-between'>
                    <button type="button" class="btn btn-info" onClick={hideModal}>Cancel</button>
                    <button type="button" class="btn btn-info" onClick={e => onSearch(e)}>Search</button>
                </div>
                </Modal.Body>
            </Modal>
    )
}

export default SearchModal
