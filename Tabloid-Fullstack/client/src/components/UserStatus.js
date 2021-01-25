import { getByTestId } from '@testing-library/react';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UserProfileContext, getUserProfile } from "../providers/UserProfileProvider";


export const UserStatusEdit = ({ profile }, { PauseState }, { RefreshState }) => {
    const [activity, setactivity] = useState(2)
    const [pendingStatus, setStatus] = useState(false)
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory()
    const showModal = (status) => { setStatus(status) }



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

    return (
        <>
            <div>
                {!pendingStatus ?
                    (profile.userStatusId == 1 && activity == 2 ? (
                        <Button
                            onClick={() => {
                                showModal(true)
                                setactivity(1)
                                PauseState()
                            }}>Deactivate</Button>)
                        : (<Button
                            onClick={() => {
                                showModal(true)
                                setactivity(1)
                                PauseState()
                            }}>Activate</Button>)
                    ) :
                    < Modal isOpen={pendingStatus} >
                        {
                            <div>
                                <ModalHeader>Deactivate Account?</ModalHeader>
                                <ModalBody>
                                    Are you sure you change {profile.displayName}'s account?
        </ModalBody>
                                <Button onClick={() => {
                                    updateProfile(profile)
                                    showModal(false)
                                    setactivity(2)


                                }}>Yes</Button> : <Button
                                    onClick={() => {
                                        showModal(false)
                                        setactivity(2)

                                    }}>Cancel</Button>

                            </div>
                        }
                    </Modal >
                }

            </div >
        </>
    )
}
export default UserStatusEdit;