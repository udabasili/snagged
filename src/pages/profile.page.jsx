import React, { Component } from "react"; 
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CustomHeader from "../components/custom-header.component";
import Loading from "../components/loading.component";
import { database, firestore } from "../services/firebase";
import { BsImages } from "react-icons/bs";
import Gallery from "../components/gallery.component";
import User from "../components/user.component";
import { NavLink } from "react-router-dom";


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userId: props.match ? props.match.params.userId : null,
	  isLoading: true,
	  userPreference: null,
	  onlineStatus: null,
	  hobbies:null,
	  selectedNav: 'about'
    }
  }
  
  changeSelectedNav = (type) =>{
	this.setState((prevState) =>({
		...prevState,
		selectedNav: type
	}))
  }

  async componentDidMount(){
	  const {userId, user} = this.state;
	  const { users } = this.props;
	  let userArray = [];
	  let onlineStatus= {}
	  if(userId ){
		  let userRecord = users.find(user => user.userId === userId)
		  console.log(userRecord)
		  if(userRecord){
			  let userPreference =  { ...userRecord.preference }
			  let userImages = [...userRecord.userImage]
			  let hobbies = [...userRecord.hobbies]
			  userRecord.timeAgo = this.getTimeAgo(userRecord.createdAt.seconds)
			//   delete userRecord.preference
			//   delete userRecord.hobbies
			//   delete userRecord.nextRoute
			//   delete userRecord.fullyRegistered
			  const statusRef = database.ref(`status`).child(userId)
			  const snapshot = await statusRef.once('value')
			  const exists = snapshot.val() !== null;
			  if (exists) {
				  onlineStatus = snapshot.val()
				  onlineStatus.lastLogin = this.getTimeAgo(onlineStatus.last_changed / 1000)
			  }
			  userArray.push({
				  ...userRecord,
			  })
			  this.setState((prevState) => ({
				  ...prevState,
				  user: userArray[0],
				  userPreference,
				  hobbies,
				  onlineStatus,
				  userImages,
				  isLoading: false
			  }))

		  }
		 
		// const snapShot = firestore.doc(`users/${userId}`).get()
		// snapShot
		// 	.then(async(result) => {
		// 		if(result.exists){
		// 			let userRecord =  {...result.data()}
		// 			let createdAt = userRecord.createdAt.toDate().toDateString()
		// 			let age = this.getAge(userRecord.birth)
		// 			let userPreference = {...userRecord.preference}
		// 			let userImages = [...userRecord.userImage ]
		// 			let hobbies = [...userRecord.hobbies]
		// 			userRecord.timeAgo = this.getTimeAgo(userRecord.createdAt.seconds)
		// 			delete userRecord.email
		// 			delete userRecord.birth
		// 			delete userRecord.createdAt
		// 			delete userRecord.preference
		// 			delete userRecord.userImage
		// 			delete userRecord.hobbies
		// 			delete userRecord.nextRoute
		// 			delete userRecord.fullyRegistered
		// 			const statusRef = database.ref(`status`).child(userId)
		// 			const snapshot = await statusRef.once('value')
		// 			const exists = snapshot.val() !== null;
		// 			if (exists) {
		// 				onlineStatus = snapshot.val()
		// 				onlineStatus.lastLogin = this.getTimeAgo(onlineStatus.last_changed /1000)
		// 			}
		// 			user.push({
		// 				...userRecord,
		// 				createdAt,
		// 				age,
		// 				userId
		// 			})
		// 			this.setState((prevState) => ({
		// 				...prevState,
		// 				user: user[0],
		// 				userPreference,
		// 				hobbies,
		// 				onlineStatus,
		// 				userImages,
		// 				isLoading: false
		// 			}))
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		toast.error(error.message)
		// 	})
	  }
	  
  }

	getAge(birth) {
		const today = new Date();
		const birthDate = new Date(birth)
		let year = today.getFullYear() - birthDate.getFullYear()
		const month = today.getFullYear() - birthDate.getFullYear()
		if (month < 0 ||
			(month === 0 && today.getDate() < birthDate.getDate())) {
			year--;
		}

		return year

	}

	timeAgo(s) {
		if (s === 1) {
			return ' ago'
		} else {
			return 's ago'
		}
	}

 	getTimeAgo(seconds) {
		let microsecond = seconds * 1000;
		let secondsDifference = (Math.floor(Date.now() - microsecond) / 1000)
		let interval = Math.floor(secondsDifference / 31536000)
		if (interval > 1) {
			return interval + ' year' + this.timeAgo(interval)
		}

		interval = Math.floor(secondsDifference / 2628003)
		if (interval > 1) {
			return interval + ' month' + this.timeAgo(interval)
		}

		interval = Math.floor(secondsDifference / 86400)
		if (interval > 1) {
			return interval + ' day' + this.timeAgo(interval)
		}

		interval = Math.floor(secondsDifference / 3600)
		if (interval > 1) {
			return interval + ' hour' + this.timeAgo(interval)
		}

		interval = Math.floor(secondsDifference / 60)
		if (interval > 1) {
			return interval + ' minute' + this.timeAgo(interval)
		}

		return Math.floor(secondsDifference) + ' second' + this.timeAgo(interval)



	}


  render() {
	  const {isLoading, user, selectedNav, hobbies, userImages, onlineStatus} = this.state;
	  const { currentUser } = this.props

    return (
		<div className='profile-page'>
			{(isLoading && !user) ? <Loading /> :
				<React.Fragment>
					<CustomHeader title='profile' link={`profile/${user.username}`} path={`profile/${user.userId}`} />
					<section className='profile'>
						<div className='profile__cover'>
							<div className='profile__avatar'>
								<img src={userImages[0]} alt={user.username} />
							</div>
							<h3 className='header-tertiary'>
								<span className='username'>
									{user.username}
								</span>
								<span className='age'>
									{user.age} years
								</span>
							</h3>
						</div>
						<div className='button-container'>
							<NavLink to='/' className='button button--edit-images' activeClassName={null} >
								Edit Images
							</NavLink>
							<NavLink to='/' className='button button--edit-profile' activeClassName={null}>
								Edit Profile
							</NavLink>
							<NavLink to='/' className='button button--edit-preferences' activeClassName={null}>
								Edit Preferences
							</NavLink>
						</div>
						<nav className='profile__nav'>
							<ul className='profile__nav__list'>
								<li
									className='profile__nav__item'
									onClick={() => this.changeSelectedNav('about')}
									style={{
										backgroundColor: selectedNav === 'about' ? 'green' : 'transparent'
									}}
								>
									About
								</li>
								<li
									className='profile__nav__item'
									onClick={() => this.changeSelectedNav('images')}
									style={{
										backgroundColor: selectedNav === 'images' ? 'green' : 'transparent'
									}}
								>
									Images
								</li>
							</ul>
						</nav>
						
						{selectedNav === 'images' &&
							<Gallery photos={userImages} isCurrentUser={
								user.userId === currentUser.userId
							} />
						}
						{selectedNav === 'about' &&
							<User 
								userData={user} 
								hobbies={hobbies} 
								onlineStatus={onlineStatus}
								isCurrentUser={
								user.userId === currentUser.userId
							} />
						}
					</section>
			</React.Fragment>
  				}
		</div>
    );
  }
}
 
const mapStateToProps = (state) => ({
	users : state.users.users
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);