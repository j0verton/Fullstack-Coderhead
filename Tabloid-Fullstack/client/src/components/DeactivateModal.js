import React, { useState } from 'react'
import { Modal, ModalBody, Button } from 'reactstrap'

export const DeactivateModal = ({ profile }) => {

    const [editing, cancelEdit] = useState(true)

    alert("HELLO!!")
    return (
        <div>hello {profile}</div>
    )
}

export default DeactivateModal;