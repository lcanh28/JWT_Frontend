import Modal from 'react-bootstrap/Modal'

const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body className='fs-6'>Are you sure delete this user: {props.dataModalDele.email}??</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={props.handleClose}>
                        Close
                    </button>
                    <button className="btn btn-danger" onClick={props.confirmDeleUser}>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDelete;