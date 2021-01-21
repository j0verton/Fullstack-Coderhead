import { getByTestId } from '@testing-library/react';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UserProfileContext, getUserProfile } from "../providers/UserProfileProvider";

export const UserStatusEdit = ({ profile }) => {
    const [pendingEdit, setPendingEdit] = useState(false)
    const { getToken } = useContext(UserProfileContext);

    const history = useHistory()


    const updateProfile = (profile) => {
        console.log("change requested")
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

    if (profile.userStatusId == 1) {
        return <Button
            onClick={() => {
                updateProfile(profile)
            }}>Deactivate</Button>

    }
    else if (profile.userStatusId == 2) {
        return <Button
            onClick={() => {
                updateProfile(profile)
            }}>Activate</Button>
    }

    //     <Modal isOpen={pendingEdit}>
    //         <ModalHeader>Update{profile.displayName}?</ModalHeader>
    //         <ModalBody>
    //             Are you sure you want to update the status?
    // </ModalBody>
    //         <ModalFooter>
    //             <Button onClick={(e) => setPendingEdit(false)}>No, Cancel</Button>
    //             <Button
    //                 className="btn btn-outline-danger"
    //                 onClick={(e) => updateProfile(profile)}
    //             >
    //                 Yes, update
    // </Button>
    //         </ModalFooter>
    //     </Modal>
}
export default UserStatusEdit;