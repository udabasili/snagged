import React, { useState, useCallback, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';
import { storage } from '../services/firebase';
import Loading from './loading.component';
import { AiOutlineClose, AiOutlineCheck} from "react-icons/ai";

/**
 *The modal that pops up when we upload an image
 *
 * @param {Object} props
 * @return {JSX} 
 */

const ImageUploadModal = (props) => {
    const { imageFile, closeModal, getImageUrl, cardNum, userId } = props
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imageBlob, setImageBlob] = useState('');
    const [imageValue, setImageValue] = useState(null);
    const [cropDimension, setCropDimension] = useState({ unit: '%', width: 50, height: 50 });
    const [imageUrl, setImageUrl] = useState('');
    const [cardIndex, setCardIndex] = useState()


    useEffect(() => {
        const reader = new FileReader();
        setCardIndex(cardNum)
        reader.addEventListener('load', () => setImageSrc(reader.result));
        reader.readAsDataURL(imageFile);
    }, [imageFile, cardNum])
    //when the image loaded, set
    const imageLoadedHandler = useCallback(img => {
        setImageValue(img);
    }, []);

    async function setImage(cropDimension) {
        if (imageValue && cropDimension.width && cropDimension.height) {
            cropImage(imageValue, cropDimension);
        }
    };

    const sendImageUrl = async() => {
        try {
            setLoading(true)
            const uploadRef = storage.ref(`/images/${userId}/image-${cardNum}`)
            const uploadTask =  uploadRef.put(imageBlob)
            uploadTask.on('state_change',
            snapshot => {},
            error => {
                throw new Error(error)
            },
            () => {
                uploadRef
                .getDownloadURL()
                .then(url =>{
                    setLoading(false)
                    toast.success('Image uploaded successfully')
                    getImageUrl(url, cardIndex)
                })
            }
            )
        } catch (error) {
            setLoading(false)

            toast.error('Something went wrong. Try again later')
            console.log(error)
            
        }
        

    }


    /**
     * when the user stops adjusting cropDimension, the image value is set
     * If use draws nothing, the original image is made to a link and returned
     * @param {*} image 
     * @param {*} cropDimension 
     * @returns imageUrl
     */
    const cropImage = async (image, cropDimension) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = cropDimension.width;
        canvas.height = cropDimension.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            cropDimension.x * scaleX,
            cropDimension.y * scaleY,
            cropDimension.width * scaleX,
            cropDimension.height * scaleY,
            0,
            0,
            cropDimension.width,
            cropDimension.height
        );
        try {
            
        } catch (error) {
            
        }
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    setImageUrl(window.URL.createObjectURL(imageFile));
                    return;
                }

                blob.name = imageFile.name.split(".")[0];
                window.URL.revokeObjectURL(imageUrl);
                setImageBlob(blob)

            }, 'image/jpeg');
        })
    };

    return (
        <div className="image-modal">
            {loading && <Loading/>}
            <div className="image-modal-content">
                <div className="image-modal-content__body">
                    <ReactCrop
                        src={imageSrc}
                        keepSelection={true}
                        ruleOfThirds={true}
                        onImageLoaded={imageLoadedHandler}
                        crop={cropDimension}
                        onChange={c => setCropDimension(c)}
                        onComplete={setImage}
                    />
                </div>
                <div className="image-modal-content__footer">
                    <div className='image-modal__button submit' onClick={sendImageUrl} >
                        <AiOutlineCheck />
                    </div>
                    <div className='image-modal__button close' onClick={closeModal} >
                        <AiOutlineClose />

                    </div>
                </div>


            </div>
        </div>

    );
}

export default ImageUploadModal;