import React from "react";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/**
 *
 *The individual card components for the image upload page
 * @param {*} { id, image, getImageFile =f=>f, isCurrentUser=true}
 * @return {JSX}
 */
const ImageUploadCard = ({ id, image, getImageFile =f=>f, isCurrentUser=true}) => {

    /**
     *This deals with the uploading the image and reading the data uploaded
    *
    * @param {Object} e
    */
    function onImageUploadHandler (e) {
        let imageElement = document.querySelector(".image-card__input")
        imageElement.click()
        imageElement.onchange = () => {            
            getImageFile(imageElement.files[0], id)
        }
    }

    return (  
        <div id={id} className="image-card">
            { image ?
            <React.Fragment>
            <img alt="Crop preview" src={image}/>
            {isCurrentUser &&
                <button 
                    className="image-card__button edit-button" 
                    onClick={onImageUploadHandler} >Edit</button>
            }
            
            </React.Fragment>
                  :
                <React.Fragment>
                    <input  
                        className="image-card__input" 
                        type="file" 
                        style={{display: "none"}}  
                        accept="image/*"/>
                    <FontAwesomeIcon className="image-card__icon" icon={faUpload}/>
                    <p className="image-card__text">Click to Upload Image</p>
                    {isCurrentUser &&
                        <button className="image-card__button" value="Add" onClick={onImageUploadHandler} >Upload</button>

                    }
                </React.Fragment>
             }
           
        </div>
    );
}
 
export default ImageUploadCard;