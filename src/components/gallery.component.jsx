import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state ={
            photos: props.photos,
            selectedImageIndex: 0,
            isCurrentUser: props.currentUser
        }
    }

    setSelectedImage = (index) =>{
        this.setState(prevState =>({
            ...prevState,
            selectedImageIndex: index
        }))
    }

    render() {
        const {photos, selectedImageIndex} = this.state
        return (
            <div className='gallery'>
                <div className='gallery__preview'>
                    <ul className='gallery__preview--list'>
                        {(photos && photos !== undefined) &&
                            photos.map((photo, index) => (
                                <li 
                                    key={`photo-${index}`} 
                                    className={`gallery__preview--item  ${selectedImageIndex === index && 'selected'}`} 
                                    onClick={() =>this.setSelectedImage(index)} >
                                        <img src={photo} alt={photo} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='gallery__selected-image'>
                    <img src={photos[selectedImageIndex]} alt={`selected-${selectedImageIndex}`}/>
                </div>
            </div>

        );
    }
}


Gallery.propTypes = {
    photos: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool
};


export default Gallery;
