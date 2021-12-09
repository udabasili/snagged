import React, { Component } from "react"; 
import { connect } from "react-redux";
import { setUserPreferences } from "../redux/user/user.actions";
import { setSearchFilter, setAllUsers } from "../redux/users/users.action";
import { filterSearch } from "../redux/users/users.utils";
import SimpleMap from "./map.component";
import Modal from "./modal.component";

/**
 *
 * This preference on the search page
 * @class FilterModal
 * @extends {Component}
 */

 
class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: props.match ? props.match.params.userId : null,
            showMapModal: false,
            placesList: props.searchFilterValues ? props.searchFilterValues.location : [],
            minSlider: props.searchFilterValues ? props.searchFilterValues.age.minAge : 18,
            maxSlider: props.searchFilterValues ? props.searchFilterValues.age.maxAge : 60,
            isOnline: props.searchFilterValues ? props.searchFilterValues.isOnline :false,
            gender: props.searchFilterValues ? props.searchFilterValues.gender : 'Male',
            location: 'any',
        
        }
    }

    onSubmit = () =>{
        try {
            const { placesList, gender, isOnline, minSlider, maxSlider } = this.state
            const {
                setUserPreferences,
                users,
                user,
                setSearchFilter,
            } = this.props

            let locations = placesList.length === 0 ? 'any' : placesList
            const userPreferences = {
                age: {
                    minAge: minSlider,
                    maxAge: maxSlider
                },
                location: locations,
                gender,
                isOnline
            }
            console.log(userPreferences)
            setSearchFilter(userPreferences)

            this.props.setShowModal(false)
        } catch (error) {
            console.log(error)
        }
       

    }


    onCloseModal = (places = []) => {
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

    onChangeSlide = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })

    }

    removePlace = (e) => {
        const id = e.target.parentNode.parentNode.id || e.target.parentNode.parentNode.parentNode.id
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

    onInputChangeHandler = (e) => {
        const { name, value } = e.target
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
            
        })
        )
    }

    onLocationChangeHandler = (e) => {
        const { name, value } = e.target
        if (value === 'map') {
            this.setState((prevState) => ({
                ...prevState,
                showMapModal: true
            })
            )
        } else {
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

  render() {
    const {gender, placesList, location, isOnline, minSlider, maxSlider, showMapModal} = this.state
    const { setShowModal} = this.props;
        return (
            <Modal title='Filter'  closeHandler={() => setShowModal(false)}  submitHandler={this.onSubmit}>
                <div className='filter-modal'>
                        {showMapModal && (
                            <SimpleMap onCloseModal={this.onCloseModal} />
                        )}
                    <div className="form-001__component float-left">
                        <label className="form-001__label  " htmlFor="gender">Gender</label>
                        <select className="form-001__input form-001__dropdown"
                            value={gender}
                            onChange={this.onInputChangeHandler}
                            id="gender" name="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Cis Gender">Cis gender</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Gender Fluid">Gender Fluid</option>
                        </select>
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label  " htmlFor="online">Is Online</label>
                        <select className="form-001__input form-001__dropdown"
                            value={isOnline}
                            onChange={this.onInputChangeHandler}
                            id="online" name="isOnline">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="form-001__component-range ">
                        <label className="form-001__label " htmlFor="city">Age Range</label>
                        <div
                            className="slide-component"
                            role="group"
                            style={{ '--minSlider': minSlider, '--maxSlider': maxSlider, '--min': 18, '--max': 99 }}
                        >
                            <label className="sr-only" htmlFor="minSlider">Min Age:</label>
                            <input
                                id="minSlider"
                                type="range"
                                name='minSlider'
                                min="18"
                                value={minSlider} max="99" onChange={this.onChangeSlide} />
                            <output name='Min Age' htmlFor="minSlider" style={{ '--c': 'var(--minSlider)' }}></output>
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
                        {(placesList.length > 0 && placesList !== 'any') ?
                            <span className="select-pure__select select-pure__select--multiple" >
                                {placesList.map((place, index) => (
                                    <span className='select-pure__label' key={index} id={place}>
                                        <span className='select-pure__selected-label'>
                                            {place}
                                            <i className='fa fa-times' onClick={this.removePlace} />
                                        </span>
                                    </span>
                                ))}
                            </span> :
                            <select className="form-001__input form-001__dropdown"
                                value={location}
                                onChange={this.onLocationChangeHandler}
                                id="location" name="location">
                                <option value="any">Any</option>
                                <option value="map">Pick a place</option>

                            </select>
                        }
                    </div>
            </div>
        </Modal>
    );
  }
}



const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users.users,
    userPreferences: state.user.userPreferences,
    searchFilterValues: state.users.searchFilterValues,
    usersCount: state.users.usersCount
})

const mapDispatchToProps = (dispatch) => ({
    setUserPreferences: (preference) => dispatch(setUserPreferences(preference)),
    setAllUsers: (preference) => dispatch(setAllUsers(preference)),
    setSearchFilter: (users) => dispatch(setSearchFilter(users)),



})


export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);