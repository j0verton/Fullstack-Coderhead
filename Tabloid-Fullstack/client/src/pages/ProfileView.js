import React, { useEffect, useState, useContext } from "react"
import { Card, Input, Progress, CardBody, CardSubtitle, CardImg, CardTitle, } from "reactstrap";
import formatDate from "../utils/dateFormatter";

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
        const userFbId = localStorage.getItem("firebaseUserId")
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/${userFbId}`, {
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
        let task = storageRef.put(file)
        task.on('state_changed',
            function progess(snapshot) {

                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingProgress(percentage)
            },
            function error(err) {

            },
            function complete() {
                task.snapshot.ref.getDownloadURL()
                    .then(saveUserProfileImg)
                    .then(getCurrentUserProfile)
                setIsLoading(false)

            }
        )
    }

    const saveUserProfileImg = (url) => {
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/img`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(url),
                })
                    .then(res => res.json())
                    .then(profile => {
                        console.log(profile)
                        setProfile(profile)
                    }));
    }


    return (
        <>


            <div>
                <Card >
                    <CardBody>
                        <CardImg top width="50px" src={`${profile.imageLocation}`} alt="avatar" />
                        <CardTitle tag="h5">{profile.displayName}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Role: {profile.userType.name}</CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Name: {profile.firstName} {profile.lastName}</CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Created on: {formatDate(profile.createDateTime)}</CardSubtitle>
                        {
                            isLoading ? <>
                                <div className="text-center">{loadingProgress}%</div>
                                <Progress value={loadingProgress} /> </> : null
                        }
                        <Input
                            type="file"
                            id="profilePicUpload"
                            placeholder="Upload a Profile Picture"
                            onChange={uploadImage} />
                    </CardBody>
                </Card >
            </div>

        </>
    )
}
export default ProfileView;