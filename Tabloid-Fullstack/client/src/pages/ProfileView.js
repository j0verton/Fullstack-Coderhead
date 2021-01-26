import React, { useEffect, useState, useContext } from "react"
import { Input, Progress } from "reactstrap";
import ProfileSummaryCard from "../components/UserProfile/ProfileSummaryCard"
import { UserProfileContext } from "../providers/UserProfileProvider";
import firebase from "firebase/app";
import "firebase/storage";

const ProfileView = () => {

    const { getToken } = useContext(UserProfileContext);
    const [profile, setProfile] = useState({ displayName: "", userType: { name: "" }, createDateTime: new Date(), firebaseUserId: localStorage.getItem("firebaseUserId") });
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        // getCurrentUserProfile()

    }, [])

    const getCurrentUserProfile = () => {
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/${profile.firebaseUserId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(profile => {
                        console.log(profile)
                        setProfile(profile)
                    }));
    }

    const uploadImage = async e => {
        console.log("uploading", e.target.files[0])
        setIsLoading(true)
        const file = e.target.files[0]
        let storageRef = firebase.storage().ref(`ProfilePictures/${file.name}`)
        // const storageRef = firebase.storage().ref();
        // const fileRef = storageRef.child(`${file.name}`)
        // fileRef.put(file)
        let task = storageRef.put(file)
        task.on('state_changed',
            function progess(snapshot) {

                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingProgress(percentage)
            },
            function error(err) {

            },
            function complete() {

            }
        )
        setIsLoading(false)
    }

    return (
        <>
            {

                <div>
                    <ProfileSummaryCard profile={profile} />
                    {
                        isLoading ?
                            <Progress value={loadingProgress} /> : null
                    }
                    <Input
                        type="file"
                        id="profilePicUpload"
                        placeholder="Upload a Profile Picture"
                        onChange={uploadImage} />
                </div>
            }
        </>
    )
}
export default ProfileView;