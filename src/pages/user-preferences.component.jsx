import React, { Component } from "react"; 
import {
    Provider,
    lightTheme,
    ProgressBar,
    RangeSlider
} from '@adobe/react-spectrum';
import { BiLeftArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';
import { matchQuestions } from "../data/matchQuestions";
import { firstQuestions } from "../data/firstQuestions";


class UserPreference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: props.match ? props.match.params.userId : null,
            showMapModal: false,
            placesList: [],
            minSlider: 18,
            leftSlideButtonDisabled: false,
            test: [1,2,4,5, 7],
            questionnaireProgress : 0,
            rightSlideButtonDisabled: false,
            maxSlider: 30,
            currentIndex: 0,
            questionnaire:{},
            userData: {
                gender: 'Male',
                location: 'any',
            }
        }
    }

    leftSlideButton = () => {
        let state = {...this.state}
        let currentIndex = state.currentIndex
        let leftSlideButtonDisabled = state.leftSlideButtonDisabled;
        let rightSlideButtonDisabled = state.rightSlideButtonDisabled
        if(currentIndex === 0 ){
            leftSlideButtonDisabled = true
        }else{
            currentIndex -= 1 
            leftSlideButtonDisabled = false

        }
        rightSlideButtonDisabled = false
        this.setState((prevState) => ({
            ...prevState,
            leftSlideButtonDisabled,
            rightSlideButtonDisabled,
            currentIndex
            
        }))


        
    }

    rightSlideButton = () => {
           let state = {
               ...this.state
           }
           let currentIndex = state.currentIndex
           let leftSlideButtonDisabled = state.leftSlideButtonDisabled;
           let rightSlideButtonDisabled = state.rightSlideButtonDisabled
           if (currentIndex === matchQuestions.length - 1) {
               rightSlideButtonDisabled = true
           } else {
               currentIndex += 1
               rightSlideButtonDisabled = false
           }
            leftSlideButtonDisabled = false

           this.setState((prevState) => ({
               ...prevState,
               leftSlideButtonDisabled,
               rightSlideButtonDisabled,
               currentIndex

           }))
    }

    onQuestionnaireChangeHandler = (e) =>{
        const {
            name,
            value
        } = e.target
        let state = {
            ...this.state
        }
        let questionnaire = {
            ...state.questionnaire
        }
        if(e.target.type){
            const question = e.target.parentNode.parentNode.parentNode.querySelector('.form__label').innerHTML
            
              questionnaire[name] = {
                  question,
                  answer: value,
                  importance: ""
              }
              let questionnaireProgress = ((Object.keys(questionnaire).length) * 100) / matchQuestions.length 

              this.setState({
                  questionnaire,
                  questionnaireProgress
              })
              console.log(this.state.questionnaire)
        }else{
            questionnaire[name].importance = value

            this.setState({
                questionnaire,
            })
        }
      
    }


    onInputChangeHandler = (e) => {
        const {
            name,
            value
        } = e.target
        this.setState((prevState) => ({
            ...prevState,
            userData: {
                ...prevState.userData,
                [name]: value
            }
        }))
    }

    onChangeSlide = (e) =>{
        this.setState({
            minSlider: e.start,
            maxSlider: e.end,
        })
        
    }



    render() {
        const {
            leftSlideButtonDisabled,
            userData,
            minSlider,
            currentIndex,
            maxSlider,
            rightSlideButtonDisabled,
            questionnaireProgress
        } = this.state;

        let enableButton = () =>{
            return questionnaireProgress === 100 &&
                minSlider >= 18 &&
                maxSlider > 18
        }

        console.log(enableButton())

        return (
        <div className='user-preference-page'>        
            <form className="form-001">
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
                     <Provider theme={lightTheme} colorScheme='dark'>
                        <RangeSlider 
                            id='slide'
                            width='100%'
                            minValue={18}
                            maxValue={100}
                            height='6rem'
                            UNSAFE_style={{backgroundColor:'whitesmoke',  fontSize: '19rem'}}
                            onChange={this.onChangeSlide} 
                            showValueLabel={true}
                            value={{
                                start: minSlider,
                                end: maxSlider
                            }}
                            label=' '/>
                    </Provider>
                </div>
                <div className="form-001__component form-001__component-select">
                    <label className="form-001__label " htmlFor="location">Location</label>
                </div>
                <h3 className='header-tertiary'>Questionnaire</h3>
                <progress max={100} value={questionnaireProgress} className='progress'></progress>
                <div className="slides">
                    <BiLeftArrow  className='left' 
                        {...(!leftSlideButtonDisabled && { onClick: this.leftSlideButton})}
                    />
                    <BiRightArrow 
                        className='right' 
                        {...(!rightSlideButtonDisabled && { onClick: this.rightSlideButton})} />
                    {
                        <div className='slide'>  
                            <div className='form'>
                                <div className="form__label">{matchQuestions[currentIndex].question}</div>
                                <div 
                                    className="form__options" 
                                    onChange={this.onQuestionnaireChangeHandler}>
                                    {matchQuestions[currentIndex].answers.map((answer, index) =>(
                                        <label className="form__option">
                                            {answer}
                                            <input type="radio" name={`question-${currentIndex}`} value={index}/> 
                                            <span className="checkmark"></span> 
                                        </label> 
                                    ))}
                                    </div>
                            </div>
                        </div>                             
                    }
                </div>
                <select className='questions-select' multiple>
                    {
                        firstQuestions.map((question, index) =>(
                            <option 
                                key={index}
                                value={question}
                                className='questions-option'
                                >
                                    {question}
                            </option>
                        ))
                    }
                </select>
                <input disabled={!enableButton()} 
                    className="button--submit u-margin-large" type="submit" value="Submit" />
            </form>
        </div>
        );
    }
    }

export default UserPreference;