import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import config from '../../config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom'


const cx = classNames.bind(style);

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const defaultValidInput = {
        isValidUsername: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidRePassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    useEffect(() => {});

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!username) {
            toast.error('Username is required');
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false;
        }

        if (!email) {
            toast.error('Email is required');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Please enter a valid email address');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        if (!phone) {
            toast.error('Phone is required');
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }

        if (!password) {
            toast.error('Password is required');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password != rePassword) {
            toast.error('Your password is not the same');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();

        if (check) {
            let response = await  registerNewUser(email, phone, username, password);
            let serverData = response.data;
            if(+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            } else {
                toast.error(serverData.EM);
            }
            console.log("response", response)
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'py-5')}>
                <div className="row">
                    <div className={cx('left', 'col-6 d-none d-sm-block mt-5')}>
                        <div className={cx('brand')}>Lê Công Anh</div>
                        <div className={cx('detail')}>
                            I was born on 28/02/2003 and am currently a student at Duy Tan University
                        </div>
                    </div>
                    <div className={cx('col-12 col-sm-6 px-5')}>
                        <div className={cx('right', 'p-3 d-flex flex-column gap-3')}>
                            <div className="form-group">
                                <label>User name:</label>
                                <input
                                    type="text"
                                    className={
                                        objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'
                                    }
                                    placeholder="User name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address:</label>
                                <input
                                    type="text"
                                    className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone number:</label>
                                <input
                                    type="text"
                                    className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className={
                                        objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Re-enter Password:</label>
                                <input
                                    type="password"
                                    className={
                                        objCheckInput.isValidRePassword ? 'form-control' : 'form-control is-invalid'
                                    }
                                    placeholder="Re-enter Password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                />
                            </div>
                            <button onClick={() => handleRegister()} className="btn btn-primary">
                                Register
                            </button>
                            <hr />
                            <div className="text-center">
                                <Link to={config.routes.login} className="btn btn-info">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
