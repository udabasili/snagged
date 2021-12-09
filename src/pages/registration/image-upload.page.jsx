import React, { Component } from "react";
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploadModal from "../../components/image-upload-modal.component";
import ImageUploadCard from "../../components/image-upload-card.component";
import { toast } from "react-toastify";
import { firestore } from "../../services/firebase";
import Loading from "../../components/loading.component";

/**
 *
 *
 * @class ImageUploadPage - page to upload user images
 * @extends {Component}
 * @returns {JSX}
 */
class ImageUploadPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
		userId: props.match ? props.match.params.userId : null,
		usersImagesComponents: [1, 2, 3, 4, 5, 6],
		userImages: {},
		showModal: false,
		cardId: "",
		isLoading: false,
		imageUrl: "",
		imageFile: "",
		imageSrc: "",
		}

		this.closeModal = this.closeModal.bind(this)
  	}

	closeModal() {
		this.setState((prevState) => ({
		...prevState,
		showModal: false,
		imageSrc: "",

		})
		)
	}

	setImageFile = (imageFile, cardId) => {
		this.setState((prevState) => ({
		...prevState,
		imageFile,
		showModal: true,
		cardId

		})
		)
	}

	getImageUrl = (url, cardNum) => {
		console.log(url)
		this.setState((prevState) => ({
		...prevState,
		imageUrl: url,
		showModal: false,
		userImages: {
			...prevState.userImages,
			[cardNum]: url
		}

		})
		)
	}
	submitImagesHandler = async () => {
		
		if (Object.keys(this.state.userImages).length < 2) {
			toast.error("You must upload at least two images")
			return;
		}
		this.setState((prevState) => ({
		...prevState,
		isLoading: true
		}))
		const {userId, userImages} = this.state;
		const images = Object.values(userImages).map((image) => (
			image
		))
		try {
			const userRef = firestore.doc(`users/${userId}`)
			

			await userRef.update({
				userImage: images,
				nextRoute: `/auth/user-preference/${userId}/add`
			})
			this.setState((prevState) => ({
				...prevState,
				isLoading: false
			}))
		this.props.history.push(`/auth/user-preference/${userId}/add`)


		} catch (error) {
		this.setState((prevState) => ({
			...prevState,
			isLoading: false
		}))
		toast.error(error)
		}


	}

	setImage = (userImage) => {
		this.setState((prevState) => ({
		...prevState,
		userImages: [...prevState.userImages, userImage]
		})
		)
	}

	render() {
		const { usersImagesComponents, showModal, userId, imageFile, userImages, cardId, isLoading } = this.state
		return (
			<div className="user-images-upload">
				{isLoading && <Loading/>}
			<button
			onClick={this.submitImagesHandler}
			className="button--submit u-margin-large">Submit</button>
			{(showModal && imageFile) &&
				<ImageUploadModal 
					imageFile={imageFile} 
					getImageUrl={this.getImageUrl} 
					cardNum={cardId} 
					userId={userId}
					closeModal={this.closeModal} />}
			<div className="user-images">
				{usersImagesComponents.map((number) => (
					<ImageUploadCard key={number}
						id={number}
						image={Object.keys(userImages).includes(String(number)) && userImages[number]}
						getImageFile={this.setImageFile}
					/>
				))
				}
			</div>
			
			</div> 
		);
	}
}


export default ImageUploadPage;