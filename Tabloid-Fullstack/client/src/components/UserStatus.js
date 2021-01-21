import { getByTestId } from '@testing-library/react';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { UserProfileContext, getUserProfile } from "../providers/UserProfileProvider";

export const UserStatusEdit = ({ profile }) => {

    const [updatedStatus, setStatus] = useState({ userStatusId: 0 })
    const [categories, setCategories] = useState([])
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory()

    // useEffect(() => {
    //     getUserProfile()
    //         .then(profile => setStatus(profile.userStatusId))
    // })


    // const handleChange = (e) => {
    //     const newPost = { ...status }
    //     updatedProfile[e.target.name] = e.target.value
    //     setEditing(newPost)
    // }

    const updateProfile = (profile) => {
        getToken().then((token) =>
            fetch(`/api/userprofile/${profile.firebaseUserId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profile),
            }))
            .then(e => history.push("/profiles"))
    }

    console.log(profile)
    if (profile.userStatusId == 1) {
        console.log(profile.firebaseUserId)
        return <Button
            onClick={e => {
                e.preventDefault()
                updateProfile(profile)
            }}>Deactivate</Button>
    }
    else if (profile.userStatusId == 2) {
        return <Button
            onClick={e => {
                e.preventDefault()
                updateProfile(profile)
            }}>Activate</Button>
    }
}
export default UserStatusEdit;