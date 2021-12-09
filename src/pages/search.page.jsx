import React, { Component } from "react"; 
import { connect } from "react-redux";
import CardList from "../components/card-list.component";
import { ChatWindowWithRedux } from "../components/chat.component";
import CustomHeader from "../components/custom-header.component";
import Filter from "../components/filter.component";
import Loading from "../components/loading.component";
import PreChat from "../components/pre-chat-component";
import Sort from "../components/sort.component";
import { chatWindowHandler, checkUserOnlineStatus, setCurrentUser, setUserPreferences } from "../redux/user/user.actions";
import { verifyMatch } from "../redux/user/user.utils";
import { setAllUsers } from "../redux/users/users.action";
import { filteredUsers } from "../redux/users/users.selector";
import { auth, database, firestore } from "../services/firebase";

const snapshotCollection = firestore.collection('users');


class SearchPage extends Component {
	statusRef = null;
	constructor(props){
		super (props);
		this.state = {
			onlIneStatus: null,
			userToChat:null,
			filteredUser: props.filteredUsers,
			cardType: 'grid',
			userMatch: false,
			loadPreChatWindow: false,
			sortValue: 'distanceFromCurrentUser',
			isOnline: [],
		}
		this.setAllUsersHandler = this.setAllUsersHandler.bind(this)
	}

	async setAllUsersHandler() {
		const { setCurrentUser, setAllUsers, isAuthenticated} = this.props
		this.unsubscribe = snapshotCollection.onSnapshot( (snapShot) =>{
			const usersRecord = []
			if (!snapShot.empty) {
				snapShot.forEach((data) => {
					let userInfo = { ...data.data() }
					delete userInfo.email
					if (isAuthenticated && data.id === auth.currentUser.uid){
						setCurrentUser({
							...userInfo,
							userId: data.id
						})
					}
					return usersRecord.push({
						...userInfo,
						userId: data.id
					})
					
				})
				setAllUsers(usersRecord)
				this.setState(prevState =>({
					...prevState,
					isLoading: false
				}))
			}
		})

	}

			

	hideChatWindowHandler = () =>{
		this.props.chatWindowHandler(false)

	}

	componentDidMount(){
		this.statusRef = database.ref('status')
		checkUserOnlineStatus()
		this.setAllUsersHandler()		
		this.statusRef.on('value', (snapshot) =>{
			const exists = snapshot.val() !== null;
			let onlIneStatus = []
			let isOnline = []
			if(exists){
				const data = snapshot.val()
				for(let key in data){
					onlIneStatus.push({
						userId: key,
						...data[key]
					})

					if(data[key].state === 'online'){
						isOnline.push(key)
					}
				}

				this.setState({
					onlIneStatus,
					isOnline
				})
			}
			
		})

	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.filteredUsers !== this.props.filteredUsers){
			this.setState(prevState => ({
					...prevState,
					filteredUsers: this.props.filteredUsers
				})
			)
		}
	}

	componentWillUnmount(){
			this.statusRef.off()
			this.unsubscribe()
		
		
	}



	setUsers = (users) =>{
		this.setState(
			{ users }
		)
	}

	setSortOption = (value) =>{
		this.setState(prevState =>({
			...prevState,
			sortValue: value
		 	})
		)
	}

	setCardType = (type) =>{
		this.setState(prevState =>({
			...prevState,
			cardType: type
		 	})
		)
	}

	verifyUsersMatch = (user) => {
		const youMatchUserRequirement = verifyMatch()
		if (youMatchUserRequirement) {
			this.setState(prevState => ({
				...prevState,
				loadPreChatWindow: true,
				userMatch: true,
				userToChat: user

			}))

		}else{
			this.setState(prevState => ({
				...prevState,
				userMatch: false,
				loadPreChatWindow: true,

			}))
		}
	}

	loadChatWindow = () =>{
		const youMatchUserRequirement = verifyMatch()
		if (youMatchUserRequirement) {
			this.setState(prevState => ({
				...prevState,
				loadPreChatWindow: false,

			}))

		}
		
		

	}

	

	
  render() {
	let usersWithoutCurrentUser
	const {user, showChatWindow, filteredUsers} = this.props;
	const { 
		isOnline,
		loadPreChatWindow, 
		userToChat,
		 onlIneStatus, 
		 isLoading, 
		 cardType, 
		 userMatch,
		 sortValue} = this.state;
	if(filteredUsers){
		usersWithoutCurrentUser = filteredUsers.filter((u) => u.userId !== auth.currentUser.uid && u.userImage !== undefined  )
		usersWithoutCurrentUser = usersWithoutCurrentUser.sort((a, b) => a[sortValue] - b[sortValue]);
	}

	return (
	<div className='search-page'>
		<CustomHeader title='search'  link={null} />
		{
			(isLoading && filteredUsers) ?
			<Loading/> :
			<section className='search' >
			<Filter  user={user}  />
			{
				loadPreChatWindow &&
				<PreChat 
					loadUserChatWindow={this.loadChatWindow}
					usersAreCompatible={userMatch}
					closeHandler={() => this.setState({loadPreChatWindow: false})}/>
			}
			<Sort setCardType={this.setCardType} sortValue={sortValue} setSortOption={this.setSortOption}/>
			<CardList 
				currentUser={user.currentUser} 
				users={usersWithoutCurrentUser} 
				cardType={cardType}
				setAllUsersHandler={this.setAllUsersHandler}
				loadChatWindow={this.verifyUsersMatch}
				isOnline={isOnline} />
			
		</section>
			
		}
		
			{
				showChatWindow &&
				<ChatWindowWithRedux user={userToChat} users={usersWithoutCurrentUser} 
						isOnline={isOnline} onlIneStatus={onlIneStatus}  />
			}
	</div>
    );
  }
}


const mapStateToProps = (state) => ({
	user: state.user,
	users: state.users.users,
	filteredUsers: filteredUsers(state),
	usersCount: state.users.usersCount,
	userPreferences: state.user.userPreferences,
	showChatWindow: state.user.showChatWindow,
	filteredUsersCount: state.users.filteredUsersCount

})

const mapDispatchToProps = (dispatch) => ({
	setUserPreferences: (preference) => dispatch(setUserPreferences(preference)),
	setAllUsers: (users) => dispatch(setAllUsers(users)),
	setCurrentUser: (users) => dispatch(setCurrentUser(users)),
	chatWindowHandler: (showChatWindow) => dispatch(chatWindowHandler(showChatWindow)),

})


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);