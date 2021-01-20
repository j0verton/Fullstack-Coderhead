import React, { useEffect, useState } from "react"
import ProfileList from "../components/ProfileList"

const ProfileManager = () => {
    const [userProfile, setUserProfile] = useState([]);
    const [editedStatus, pendingStatus] = useState(false)
    useEffect(() => {
        fetch("/api/userprofile")
            .then((res) => res.json())
            .then((profiles) => {
                setUserProfile(profiles)
            });
    }, [])



    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12"></div>
            <div className="col-lg-10 col-xs-12">
                <ProfileList profiles={userProfile} pendingStatus={pendingStatus} />
            </div>
        </div>
    )
}




export default ProfileManager