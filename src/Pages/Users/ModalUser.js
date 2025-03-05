import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import {createNewUser, fetchGroups} from '../../services/userService'
import { toast } from 'react-toastify';
import _ from 'lodash'

const ModalUser = (props) => {
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }

    const [userGroups, setUserGroups] = useState([])
    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(() => {
        getGroups()
    }, [])
    const getGroups = async () => {
        let res = await fetchGroups()
        if(res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
            if(res.data.DT && res.data.DT.length > 0) {
                let group = res.data.DT
                setUserData({...userData, group: group[0].id})
            }
        } else {
            toast.error(res.data.EM)
        }
    }
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }
    const CheckValidInputs = () => {
        //create user
        setValidInputs(validInputsDefault)
        let array = ['email', 'phone', 'password', 'group']
        let check = true
        for(let i = 0; i < array.length; i++) {
            if(!userData[array[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[array[i]] = false
                setValidInputs(_validInputs)

                toast.error(`Empty input ${array[i]}`)
                check = false
                break;
            }
        }
        return check
    }
    
    const handleSubmitUser = async () => {
        let check = CheckValidInputs()
        if(check === true) {
            let res = await createNewUser({...userData, groupId: userData['group']})
            if(res.data && res.data.EC === 0) {
                props.handleClose()
                setUserData({...defaultUserData, group: userGroups[0].id})
                toast.success(res.data.EM)
            } else {
                toast.error(res.data.EM)
            }
        }
    }

    return (
        <>
            <Modal size='lg' show={props.show}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='fs-6'>
                    <div className='content-body row'>
                        <div className='col-6 form-group'>
                            <label>Email Address (<span className="text-danger">*</span>) :</label>
                            <input type='email' id='email' name="email"
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'} 
                                value={userData.email}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'email')}
                                required
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>User Name :</label>
                            <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.username}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'username')}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Phone Number (<span className="text-danger">*</span>) :</label>
                            <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.phone}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'phone')}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Password (<span className="text-danger">*</span>) :</label>
                            <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type='password' value={userData.password}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'password')}
                            ></input>
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address :</label>
                            <input className='form-control' type='text' value={userData.address}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'address')}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Group (<span className="text-danger">*</span>) :</label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                            >
                                {userGroups.length > 0 && 
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} defaultValue={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Gender :</label>
                            <select className="form-select"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'sex')}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" 
                        onClick={() => {
                            props.handleClose()
                            setUserData({...defaultUserData, group: userGroups[0].id})
                            setValidInputs(validInputsDefault)
                        }}
                    >
                        Close
                    </button>
                    <button className="btn btn-success" onClick={() => handleSubmitUser()}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;