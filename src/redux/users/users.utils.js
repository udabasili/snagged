import { auth } from "../../services/firebase"

export const filterSearch = (users=[],  filters={}) =>{
    let locations = filters.location
    if (locations !== 'any' && locations.length !== 0){
        locations = locations.map((location) =>(
            location.toLowerCase()
        ))
    }    

    users = users.filter(user =>{
        if(user.gender){
            return user.gender.toLowerCase() === filters.gender.toLowerCase()
        }
    })
    .filter(user => {
        if (Number(user.age) >= Number(filters.age.minAge) && Number(user.age) <= Number(filters.age.maxAge)){
            return user
        }
    })
    .filter(user => {
        if(locations === 'any'){
            return user
        }
        return locations.includes(user.city.toLowerCase())
    })

    return users

}


export const setUsers = (users) =>{
    const currentUser = users.find(user => user.userId === auth.currentUser.uid )

    let usersRecord = users.map((user) => {
        if (user.birth) {
            user.age = getAge(user.birth)
            delete user.birth
        }

        if(currentUser){
            const distance = calcCrow(
                currentUser.coords.lat, 
                currentUser.coords.lng, 
                user.coords.lat, 
                user.coords.lng)
            user.distanceFromCurrentUser = distance;
        }
        if(user.createdAt){

            let seconds = user.createdAt.seconds
            let microsecond = seconds * 1000;
            user.secondsAgo =  (Math.floor(Date.now() - microsecond) / 1000)
            user.timeAgo = getTimeAgo(seconds)
        }
        return user
    })
    return usersRecord
}

function getAge(birth) {
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

function timeTag (s) {
    if (s === 1){
        return ' ago'
    } else{
        return 's ago'
    }
}
function getTimeAgo (seconds) {
    let microsecond = seconds * 1000;
    let secondsDifference = (Math.floor(Date.now() - microsecond) / 1000 )
    let interval = Math.floor(secondsDifference / 31536000) 
    if (interval > 1){
        return interval + ' year' + timeTag(interval)
    }  

    interval = Math.floor(secondsDifference / 2628003) 
    if (interval > 1) {
        return interval + ' month' + timeTag(interval)
    }

    interval = Math.floor(secondsDifference / 86400)
    if (interval > 1) {
        return interval + ' day' + timeTag(interval)
    }

    interval = Math.floor(secondsDifference / 3600)
    if (interval > 1) {
        return interval + ' hour' + timeTag(interval)
    }

    interval = Math.floor(secondsDifference / 60)
    if (interval > 1) {
        return interval + ' minute' + timeTag(interval)
    }

    return Math.floor(secondsDifference) + ' second' + timeTag(interval)
   


}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }