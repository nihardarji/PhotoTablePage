import React, { useContext, useState } from 'react'
import ImageContext from '../../contexts/images/imageContext'
import {Button, Form} from 'react-bootstrap'

const Search = () => {
    const imageContext = useContext(ImageContext)
    const [searchString, setSearchString ] = useState('')
    const onClick = () => {
        setSearchString('')
        imageContext.displaySearchModal(true)
    }

    const onChange = (e) => {
      setSearchString(e.target.value)
      imageContext.filterImages(e.target.value)
    }
    return (
          <Form className='my-2 mx-4'>
            <input type="text" className='form-control my-2' value={searchString} onChange={e => onChange(e)} id=""/>
            <Button  variant="outline-info" onClick={onClick} name="search">Search</Button>
          </Form>
    )
}

export default Search
