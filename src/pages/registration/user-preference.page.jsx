import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../components/loading.component';
import SimpleMap from '../../components/map.component';
import { setCurrentUser, setUserPreferences, setUserRegistrationStatus } from '../../redux/user/user.actions';
import { createUserDocument, firestore } from '../../services/firebase';

class UserPreferencePage extends Component {
    constructor(props){
        super (props);
        this.state ={
            loading: false,
            userId: props.match ? props.match.params.userId : null,
            showMapModal: false,
            placesList: [],
            minSlider: 18 ,
            maxSlider: 60,
            userData:{
                gender: 'Male',
                location: 'any',
            }
        }
    }

    
    

    onCloseModal = (places=[]) =>{
        const placesList = places.map((place, index) => (
            place.city
        ))
        this.setState((prevState) => ({
            ...prevState,
            showMapModal: false,
            placesList
        })
        )
    }
    onInputChangeHandler = (e) => {
        const { name, value } = e.target
        this.setState((prevState) => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                [name]: value
            }
        })
        )
    }

    removePlace = (e) => {
        const id = e.target.parentNode.parentNode.id || e.target.parentNode.parentNode.parentNode.id
        console.log(id)
        let places = [...this.state.placesList]
        places = places.filter(place => {
            return place.trim().toLowerCase() !== id.trim().toLowerCase()
        })
        this.setState((prevState) => ({
            ...prevState,
            placesList: places,
        })
        )
    }

    onLocationChangeHandler = (e) => {
        const { name, value } = e.target
        if(value === 'map'){
            this.setState((prevState) => ({
                ...prevState,
                showMapModal: true
            })
            )
        }else{
            this.setState((prevState) => ({
                ...prevState,
                userData: {
                    ...prevState.userData,
                    [name]: value
            }
        })
        )
        }
        
    }

    onChangeSlide = (e) =>{
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
        
    }

  
    onSubmitHandler = async (e) =>{
        e.preventDefault()
        const { setUserPreferences, setUserRegistrationStatus } = this.props;
        this.setState((prevState) => ({
            ...prevState,
            loading: true
        }))
        try {
            let location;
            const { placesList, userData, minSlider, maxSlider, userId } = this.state;
            if (placesList.length > 0) {
                location = placesList
            } else {
                location = 'any'
            }
            if (minSlider >= maxSlider) {
                toast.error('Min age cannot be greater than or equal to max age')
                return;
            }
            const userRef = firestore.doc(`users/${userId}`)
            await userRef.update({
                preference:{
                    age:{
                        minAge: minSlider,
                        maxAge:maxSlider
                    },
                    location,
                    gender:userData.gender

                },
                fullyRegistered: true,
                nextRoute: null
            })
            setUserRegistrationStatus(true)
            const userDataRecord = await (await userRef.get())
            setCurrentUser({
                ...userDataRecord.data(),
                userId
            })
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            this.props.history.push(`/`)
        } catch (error) {
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            toast.error(error)
        }
        

    }
    render() {
        const {loading, userData, minSlider, maxSlider, showMapModal, placesList} = this.state;
        
        return (
            <div className='user-preference-page'>
                {loading && <Loading />}
                {showMapModal && (
                        <SimpleMap onCloseModal={this.onCloseModal}/>
                )}
                <form className="form-001" onSubmit={this.onSubmitHandler}>
                    <h2 className='about__header'>
                        Your Dating Preferences
                    </h2>
                    <div className="form-001__component float-left">
                        <label className="form-001__label  " htmlFor="gender">Gender</label>
                        <select className="form-001__input form-001__dropdown "
                            value={userData.gender}
                            onChange={this.onInputChangeHandler}
                            id="gender" name="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Cis Gender">Cis gender</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Gender Fluid">Gender Fluid</option>

                        </select>
                    </div>

                    <div className="form-001__component-range ">
                        <label className="form-001__label " htmlFor="city">Age Range</label>
                        <div 
                            className="slide-component" 
                            role="group" 
                            style={{'--minSlider': minSlider ,'--maxSlider': maxSlider , '--min': 18,'--max': 99}}
                            >
                            <label className="sr-only" htmlFor="minSlider">Min Age:</label>
                            <input 
                                id="minSlider" 
                                type="range"
                                name='minSlider'
                                min="18" 
                                value={minSlider} max="99" onChange={this.onChangeSlide} />
                            <output name='Min Age' htmlFor="minSlider" style={{ '--c': 'var(--minSlider)'}}></output>
                            <label className="sr-only" htmlFor="maxSlider">Max Age:</label>
                            <input id="maxSlider" 
                                type="range" 
                                min="18" 
                                value={maxSlider} 
                                name='maxSlider'
                                max="99" 
                                onChange={this.onChangeSlide} />
                            <output name='Max Age' htmlFor="maxSlider" style={{ '--c': 'var(--maxSlider)' }}></output>
                        </div>
                    </div>
                    <div className="form-001__component form-001__component-select">
                        <label className="form-001__label " htmlFor="location">Location</label>
                        {placesList.length > 0 ?
                            <span className="select-pure__select select-pure__select--multiple" > 
                                {placesList.map((place, index) =>(
                                    <span className='select-pure__label' key={index} id={place}>
                                        <span className='select-pure__selected-label'>
                                            {place}
                                            <i className='fa fa-times' onClick={this.removePlace}/>
                                        </span>
                                    </span>
                                ))}
                            </span> :
                            <select className="form-001__input form-001__dropdown"
                                value={userData.location}
                                onChange={this.onLocationChangeHandler}
                                id="location" name="location">
                                <option value="any">Any</option>
                                <option value="map">Pick a place</option>

                            </select>
                        }

                    </div>
                    <input className="button--submit u-margin-large" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fullyRegistered: state.user.fullyRegistered
})

const mapDispatchToProps = (dispatch) =>({
    setUserPreferences: (preference) => dispatch(setUserPreferences(preference)),
    setUserRegistrationStatus: (value) => dispatch(setUserRegistrationStatus(value))

})

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferencePage)