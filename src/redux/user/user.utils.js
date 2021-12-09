export const filterUsersByPreference = (users = [], isAuthenticated = false, filters = {}) => {
    if (!isAuthenticated) {
        return users
    }

    if (!filters || Object.keys(filters).length === 0) {
        return users;
    }

    if (users.length === 0 || !users) {
        return users
    }
    let locations = filters.location
    if (locations !== 'any' && locations.length !== 0) {
        locations = locations.map((location) => (
            location.toLowerCase()
        ))
    }

    users = users.filter(user => {
        console.log(user.gender, filters.gender)
        return user.gender.toLowerCase() === filters.gender.toLowerCase()
    })
        .filter(user => {
            if (Number(user.age) >= Number(filters.age.minAge) && Number(user.age) <= Number(filters.age.maxAge)) {
                return user
            }
        })
        .filter(user => {
            if (locations === 'any') {
                return user
            }
            return locations.includes(user.city.toLowerCase())
        })

    return users

}


export const setUser = (user) => {
        if (user.birth) {
            user.age = getAge(user.birth)
            delete user.birth
        }
        if (user.createdAt) {
            let seconds = user.createdAt.seconds
            let microsecond = seconds * 1000;
            user.secondsAgo = (Math.floor(Date.now() - microsecond) / 1000)
            user.timeAgo = getTimeAgo(seconds)
        }
        return user
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

function timeTag(s) {
    if (s === 1) {
        return ' ago'
    } else {
        return 's ago'
    }
}
function getTimeAgo(seconds) {
    let microsecond = seconds * 1000;
    let secondsDifference = (Math.floor(Date.now() - microsecond) / 1000)
    let interval = Math.floor(secondsDifference / 31536000)
    if (interval > 1) {
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


export function verifyMatch (currentUser, user, criteria) {
    let usersMatchUp = false
    return usersMatchUp

}