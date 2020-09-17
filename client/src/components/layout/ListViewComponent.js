import React, { useContext } from 'react'
import ImageContext from '../../contexts/images/imageContext'
import {Table} from 'react-bootstrap'

const ListViewComponent = () => {
    const imageContext = useContext(ImageContext)
    return (
        <div className='responsive-table centered'>
            { (imageContext.imageList !== null && imageContext.imageList.length !== 0) ? <Table>
            <thead>
            <tr>
                <th>Thumbnail</th>
                <th>Caption/Note</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Created By</th>
            </tr>
            </thead>

            <tbody>
            { imageContext.imageList && imageContext.imageList.map(image => 
                <tr>
                <td><img src={image.image_url} className='responsive-img' width='200rem' height='200rem'/></td>
                <td>{image.description}</td>
                <td>{image.location.latitude}</td>
                <td>{image.location.longitude}</td>
                <td>{image.created_by}</td>
            </tr>
            )}

            </tbody>
        </Table> : <div> There are no images to display</div> }
        </div>
    )
}

export default ListViewComponent
