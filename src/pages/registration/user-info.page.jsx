import React, { Component } from 'react'
import { connect } from 'react-redux';
import hobbies from '../../data/hobbies';
import SelectPure from "select-pure";
import { firestore } from '../../services/firebase';
import { toast } from 'react-toastify';
import Loading from '../../components/loading.component';

/**
 *
 *
 * @class UserInfoPage - Component related to user information form
 * @extends {Component}
 * @return {JSX}
 */
class UserInfoPage extends Component {

    /**
     * Creates an instance of UserInfoPage.
     * @param {*} props
     * @memberof UserInfoPage
     */
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: props.match ? props.match.params.userId : null,
            mode: props.mode ? props.mode : null,
            hobbies: Object.values(hobbies).map((hobby) => ({
                    label: hobby,
                    value: hobby
                })
            ),
            userData: {
                birth: "",
                occupation: "",
                smoker: 'yes',
                drinker: "yes",
                education: 'High school',
                children: "yes",
                city: "",
                country: "",
                gender: "male",
                marital: "single",
                bioContent: '',
                coords: {
                    lat: 0,
                    lng: 0
                },
                hobbies: [],
                sexuality:'Heterosexual',
                tribe: '',
                province: '',
                religion: "",
            },
            bioContentError: null
        }

        this.onInputChangeHandler = this.onInputChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)


    }

    componentDidMount() {
        let span = document.querySelectorAll(".select-pure")
        navigator.geolocation.getCurrentPosition(this.geoSuccess,() =>{
        });
        Array.from(span).forEach(sp => this.selectPureFunction(sp.id, sp.className))
    }

    
    /**
     * This a  component that styles the hobbies input
     * @param {*} id 
     * @param {*} className 
     */
    selectPureFunction(id, className) {
        new SelectPure(`.select-pure`, {
            options: this.state[id],
            placeholder: "-Please select-",
            multiple: true,
            icon: "fa fa-times",
            onChange: value => {
                this.setState((prevState) => ({
                    ...prevState,
                    userData: {
                        ...prevState.userData,
                        [id]: value
                    }
                })
                )
            },
            classNames: {
                select: "select-pure__select",
                dropdownShown: "select-pure__select--opened",
                multiselect: "select-pure__select--multiple",
                label: "select-pure__label",
                placeholder: "select-pure__placeholder",
                dropdown: "select-pure__options",
                option: "select-pure__option",
                autocompleteInput: "select-pure__autocomplete",
                selectedLabel: "select-pure__selected-label",
                selectedOption: "select-pure__option--selected",
                placeholderHidden: "select-pure__placeholder--hidden",
                optionHidden: "select-pure__option--hidden",
            },
            autocomplete: true
        });

    }

    /**
     *
     * Handles user inputs
     * @param {Object} e
     * @memberof UserInfoPage
     */
    onInputChangeHandler(e) {
        const { name, value } = e.target
        this.setState((prevState) => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                [name]: value
            }
        }), () =>{
            const { name, value } = e.target
            if(name === 'bioContent'){
                if (value.length < 200) {
                    this.setState((prevState) => ({
                        ...prevState,
                        bioContentError: 'This must be at least 200 characters'
                    }))
                } else {
                    this.setState((prevState) => ({
                        ...prevState,
                        bioContentError: null
                    }))

                }
            }
        }
        )
        
    }

    geoSuccess = (position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        this.setState((prevState) => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                coords: {
                    lat,
                    lng
                }
            }
        }))
    }


    async onSubmitHandler(e) {
        e.preventDefault()
        const { userData, userId, bioContentError } = this.state;

        if(bioContentError){
            toast.error('There some error with form')
            return;
        }
        this.setState((prevState) =>({
            ...prevState,
            loading: true
        }))

        try {
            const userRef = firestore.doc(`users/${userId}`)
            await userRef.update({
                ...userData,
                nextRoute: `/auth/image-upload/${userId}/add-images`
            })
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            this.props.history.push(`/auth/image-upload/${userId}/add-images`)

        } catch (error) {
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            toast.error(error.message)
        }
       
    }

    render() {
        const { userData, loading, bioContentError } = this.state;
        return (
            <div className='user-info'>
                {loading && <Loading/>}
                <form className="form-001" onSubmit={this.onSubmitHandler} >
                    <div className="form-001__component ">
                        <label className="form-001__label" htmlFor="bio">
                            About Me 
                        </label>
                        <textarea
                            value={userData.bioContent}
                            onChange={this.onInputChangeHandler}
                            className="form-001__input form-001__text-area"
                            required
                            placeholder='Must be at least 200 characters'
                            title='Must be at least 200 characters'
                            type="text"
                            id="bio"
                            minLength={200}
                            name="bioContent" >
                        </textarea>
                        <div className='form-001__footer' style={{
                                display:'flex'
                            }}>
                            <div className='error'>
                                {bioContentError}
                            </div>
                            <div className='word-count' >
                                <span>Count: </span>
                                <span
                                    style={{ color: userData.bioContent.length < 200 ? 'red' : 'black' }}>
                                    {userData.bioContent.length}
                                </span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="form-001__component form-001__component-select">
                        <label className="form-001__label " htmlFor="hobbies">Hobbies</label>
                        <span id="hobbies" className="select-pure"> </span>

                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="birth">BirthDate</label>
                        <input
                            className="form-001__input"
                            type="date"
                            id="birth"
                            value={userData.birth}
                            onChange={this.onInputChangeHandler}
                            name="birth"
                            required
                        />
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="occupation">Occupation</label>
                        <input className="form-001__input"
                            type="text"
                            id="occupation"
                            value={userData.occupation}
                            onChange={this.onInputChangeHandler}
                            name="occupation"
                            required
                        />
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label " htmlFor="tribe">Tribe</label>
                        <input
                            className="form-001__input"
                            type="text" id="tribe"
                            onChange={this.onInputChangeHandler}
                            required
                            name="tribe" value={userData.tribe} />
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="smoker">Smoker</label>
                        <select className="form-001__input form-001__dropdown"
                            value={userData.smoker}
                            onChange={this.onInputChangeHandler}
                            id="smoker" name="smoker">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Socially">Socially</option>
                        </select>
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label " htmlFor="drinker">Drinker</label>
                        <select className="form-001__input form-001__dropdown"
                            value={userData.drinker}
                            onChange={this.onInputChangeHandler}
                            id="drinker" name="drinker">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Socially">Socially</option>
                        </select>
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="children">Children</label>
                        <select className="form-001__input form-001__dropdown"
                            id="children"
                            value={userData.children}
                            onChange={this.onInputChangeHandler}
                            name="children">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Undecided">Undecided</option>
                        </select>
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label " htmlFor="gender">Gender</label>
                        <select className="form-001__input form-001__dropdown"
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
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="marital">Marital Status</label>
                        <select className="form-001__input form-001__dropdown"
                            value={userData.marital}
                            onChange={this.onInputChangeHandler}
                            id="marital" name="marital">
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="sexuality">Sexuality</label>
                        <select className="form-001__input form-001__dropdown"
                            value={userData.sexuality}
                            onChange={this.onInputChangeHandler}
                            id="sexuality" name="sexuality">
                            <option value="bisexual ">Bisexual </option>
                            <option value="asexual ">Asexual </option>
                            <option value="homosexual">Homosexual </option>
                            <option value="heterosexual ">Heterosexual </option>
                            <option value="pansexual ">Pansexual </option>
                            <option value="questioning ">Questioning </option>


                        </select>
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="religion">Religion</label>
                        <input 
                            className="form-001__input" 
                            type="text" id="religion" 
                            onChange={this.onInputChangeHandler}
                            required
                            name="religion" value={userData.religion} />
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label " htmlFor="city">City</label>
                        <input className="form-001__input" 
                            type="text" 
                            id="city" 
                            name="city" 
                            onChange={this.onInputChangeHandler}
                            value={userData.city} required />
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="province">Province/State</label>
                        <input 
                            className="form-001__input" 
                            onChange={this.onInputChangeHandler}
                            type="text" 
                            required
                            id="province" name="province" value={userData.province} />
                    </div>
                    <div className="form-001__component float-left">
                        <label className="form-001__label " htmlFor="country" >Country</label>
                        <input className="form-001__input" 
                            type="text" 
                            id="country" 
                            onChange={this.onInputChangeHandler}
                            name="country" value={userData.country}  />
                    </div>
                    <div className="form-001__component float-right">
                        <label className="form-001__label " htmlFor="education">Education</label>
                        <select className="form-001__input form-001__dropdown"
                            value={userData.education}
                            onChange={this.onInputChangeHandler}
                            id="education" name="education">
                            <option value="High school">High school </option>
                            <option value="Some College">Some College </option>
                            <option value="Some University">Some University </option>
                            <option value="Associate's Degree">Associate's Degree </option>
                            <option value="Graduate Degree">Graduate Degree </option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="PhD ">PhD </option>


                        </select>
                    </div>
                        <input className="button--submit u-margin-large" type="submit" value="Submit" />
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage)
