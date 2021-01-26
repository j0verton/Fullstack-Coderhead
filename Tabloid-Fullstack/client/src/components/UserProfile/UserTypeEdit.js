import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const UserTypeEdit = ({ profile, getProfiles }) => {
    //setStatus is for the status of the modal (showing or not showing)
    const [pendingStatus, setStatus] = useState(false)
    const { getToken } = useContext(UserProfileContext);
    const showModal = (status) => { setStatus(status) }

    //to update the user type, only a profile is passed
    const updateType = (profile) => {
        getToken().then((token) =>

            fetch(`/api/userprofile/typeEdit/${profile.firebaseUserId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profile),
            }))
            .then(e => getProfiles())
            .then(e => showModal(false))
    }

    return (
        <>
            <div>
                {!pendingStatus ?
                    (profile.userTypeId == 1 ? (
                        <Button
                            onClick={() => {
                                showModal(true)
                            }}>Demote to Author</Button>)
                        : (<Button
                            onClick={() => {
                                showModal(true)
                            }}>Promote to Admin</Button>)
                    ) :
                    < Modal isOpen={pendingStatus} >
                        {
                            <div>
                                <ModalHeader>{profile.userTypeId == 1 ? "Demote" : "Promote"} user?</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to {profile.userTypeId == 1 ? (`demote ${profile.displayName}'s account to author?`) : (
                                        `promote ${profile.displayName}'s account to admin?`)}
                                </ModalBody>
                                <Button onClick={() => {
                                    updateType(profile)


                                }}>Yes</Button> : <Button
                                    onClick={() => {
                                        showModal(false)
                                    }}>Cancel</Button>

                            </div>
                        }
                    </Modal >
                }

            </div >
        </>
    )
}
export default UserTypeEdit;