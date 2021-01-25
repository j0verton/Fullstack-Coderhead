import { getByTestId } from '@testing-library/react';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UserProfileContext, getUserProfile } from "../providers/UserProfileProvider";


export const UserStatusEdit = ({ profile }) => {
    const [activity, setactivity] = useState(2)
    const [pendingStatus, setStatus] = useState(false)
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory()
    const showModal = (status) => { setStatus(status) }

    c

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
                            }}>Deactivate</Button>)
                        : (<Button
                            onClick={() => {
                                showModal(true)
                                setactivity(1)
                            }}>Activate</Button>)
                    ) :
                    < Modal isOpen={pendingStatus} >
                        <ModalHeader>Update?</ModalHeader>
                        <ModalBody>
                            Are you sure you want to update the status?
        </ModalBody>
                        <Button onClick={() => {
                            updateProfile(profile)
                            showModal(false)
                            setactivity(2)

                        }}>Yes, activate</Button>

                    </Modal >
                }

            </div >
        </>
    )
}
export default UserStatusEdit;