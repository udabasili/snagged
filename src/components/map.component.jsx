import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Modal from './modal.component';
import Geocode from "react-geocode";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const GOOGLE_MAP = process.env.REACT_APP_GOOGLE_MAP_API
Geocode.setApiKey(GOOGLE_MAP);
const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            title: 'Pick place(s)',
            chosenPlaces: [],
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 8
        }
    }


    
    componentDidMount(){
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.setState((prevState) => ({
                        center: pos,
                        isLoading: false
                    })
                    )
                })
            }
        } catch (error) {   
            toast.error(error)
        }
       
    }

    


    removeAddressHandler = (e) =>{
        const id = e.target.parentNode.id || e.target.parentNode.parentNode.id.toString()
        let places = [...this.state.chosenPlaces]
        places = places.filter(place => {
            return place.city.trim().toLowerCase() !== id.trim().toLowerCase()
        })
        console.log(places)
        this.setState((prevState) => ({
            ...prevState,
            chosenPlaces: places,
        })
        )
    }
    onMapChange = (e) => {
        try {
            const { lat, lng } = e
            var pos = {
                lat,
                lng
            };
            const coord = pos
            Geocode.fromLatLng(lat, lng).then(
                response => {
                    const address = response.results[0].formatted_address;
                    let city = address.split(',')
                    city = city[city.length - 3]
                    this.setState((prevState) => ({
                            ...prevState,
                            chosenPlaces: [...prevState.chosenPlaces, {
                                city,
                                coord
                            }],
                        })
                    )
                },
                error => {
                    console.error(error);
                    throw new Error(error)
                }
            );
        } catch (error) {
            toast.error('Something went wrong try again later')
        }
        
    }

    onSubmit = () =>{
        const {chosenPlaces } = this.state;
        this.props.onCloseModal(chosenPlaces)
    }

    render() {
        let placesList = null;
        const { onCloseModal} = this.props;
        const {center, zoom, isLoading, title, chosenPlaces} = this.state;
        if (chosenPlaces.length > 0){
            placesList = chosenPlaces.map((place, index) => (
                <div className='place' key={index} id={place.city.trim()}>
                    {place.city}
                    <FontAwesomeIcon icon={faTimes} color='white' className='cancel' onClick={this.removeAddressHandler} />

                </div>
            ))
            placesList = (

                <div className='places'>
                    {placesList}

                </div>
            )
        }
       


        return (
            <Modal 
                title={title} 
                closeHandler={() => this.props.onCloseModal()} 
                isLoading={isLoading} 
                submitHandler={this.onSubmit}
                subHeader={placesList} >
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAP}}
                        defaultCenter={center}
                        defaultZoom={zoom}
                        onClick={this.onMapChange}>  
                        {
                            chosenPlaces.length > 0 && chosenPlaces.map((place) => (
                                <AnyReactComponent
                                    lat={place.coord.lat}
                                    lng={place.coord.lng}
                                    text={'Chosen Place'}
                                />
                            ))
                        }
                        
                    </GoogleMapReact>
                </div>
            </Modal>

        );
    }
}

export default SimpleMap;