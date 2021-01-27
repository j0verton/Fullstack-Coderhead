import React, { useEffect, useState, useContext } from "react"
import { Card, Input, Progress, CardBody, CardSubtitle, CardImg, CardTitle, Media, Col } from "reactstrap";
import formatDate from "../utils/dateFormatter";

import ProfileSummaryCard from "../components/UserProfile/ProfileSummaryCard"
import { UserProfileContext } from "../providers/UserProfileProvider";
import firebase from "firebase/app";
import "firebase/storage";

const ProfileView = () => {

    const { getToken, getCurrentUser, getUserProfile } = useContext(UserProfileContext);
    const [profile, setProfile] = useState(getCurrentUser());
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        getCurrentUserProfile()

    }, [])

    const getCurrentUserProfile = () => {
        const user = localStorage.getItem("userProfile")
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/${getCurrentUser().firebaseUserId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(profile => {
                        setProfile(profile)
                    }));
    }

    const uploadImage = async e => {
        console.log("uploading", e.target.files[0])
        setIsLoading(true)
        const file = e.target.files[0]
        let storageRef = firebase.storage().ref(`ProfilePictures/${file.name}${new Date().getTime()}`)
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
        console.log(url)
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/img`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body:
                        JSON.stringify({
                            imageLocation: url
                        }
                        ),

                })
                    .then(res => res.json())
                    .then(profile => {
                        console.log('response', profile)
                        getCurrentUserProfile()
                    }));
    }


    return (
        <>


            <Col sm="12" md={{ size: 6, offset: 3 }}>
                {/* <Img top width="10%" src={`${profile.imageLocation}`} alt="avatar" /> */}
                <Card className="mx-20">
                    <Media left href="#">
                        <Media object src={`${profile.imageLocation}`} alt="Generic placeholder image" />
                    </Media>
                    <CardBody>
                        <CardTitle tag="h5">{profile.displayName}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Role: {profile.userType.name}</CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Name: {profile.firstName} {profile.lastName}</CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Created on: {formatDate(profile.createDateTime)}</CardSubtitle>
                        {
                            isLoading ? <>
                                <div className="text-center">{loadingProgress}%</div>
                                <Progress className="mb-2" value={loadingProgress} /> </> : null
                        }
                        <Input className="mb-2"
                            type="file"
                            id="profilePicUpload"
                            placeholder="Upload a Profile Picture"
                            onChange={uploadImage} />
                    </CardBody>
                </Card >
            </Col>

        </>
    )
}
export default ProfileView;