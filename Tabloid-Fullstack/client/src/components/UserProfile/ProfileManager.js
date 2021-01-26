import React, { useEffect, useState } from "react"
import ProfileList from "./ProfileList"

const ProfileManager = () => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        getProfiles()
    }, [])

    const getProfiles = () => {
        fetch("/api/userprofile")
            .then((res) => res.json())
            .then((profiles) => {
                setUserProfile(profiles)
            });
    }



    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12"></div>
            <div className="col-lg-10 col-xs-12">
                <ProfileList profiles={userProfile} getProfiles={getProfiles} />
            </div>
        </div>
    )
}




export default ProfileManager