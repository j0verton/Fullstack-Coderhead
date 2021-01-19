import React, { useEffect, useState } from "react"

const Profiles = () => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() =>
        fetch("/api/userprofile/")
            .then(res => res.json())
            .then((profiles) => {
                setUserProfile(profiles)
            }), [])
}

return console.log(userProfile);

export default ProfileManager