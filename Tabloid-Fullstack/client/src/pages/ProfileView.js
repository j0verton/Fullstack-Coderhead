import React, { useEffect, useState, useContext } from "react"
import { Input, Progress } from "reactstrap";
import ProfileSummaryCard from "../components/UserProfile/ProfileSummaryCard"
import { UserProfileContext } from "../providers/UserProfileProvider";

const ProfileView = () => {

    const { getToken } = useContext(UserProfileContext);
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCurrentUserProfile()

    }, [])


    const getCurrentUserProfile = () => {
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/${profile.firebaseUserId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }))

            .then((res) => res.json())
            .then((profile) => {
                setProfile(profile)
            });
    }
    return (
        <div>
            <ProfileSummaryCard profile={profile} />
            {
                isLoading ?
                    <Progress /> : null
            }
            <Input type="file" value="Upload a Profile Picture" id="profilePicUpload" />
        </div>
    )
}
export default ProfileView;