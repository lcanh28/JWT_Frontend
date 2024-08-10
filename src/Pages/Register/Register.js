import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import config from '../../config';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(style);

function Register() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleRegister = () => {
        let userData = { email, phone, username, password, rePassword };
        console.log('check data', userData);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'py-5')}>
                <div className="row">
                    <div className={cx('left', 'col-7 d-none d-sm-block mt-5')}>
                        <div className={cx('brand')}>Lê Công Anh</div>
                        <div className={cx('detail')}>
                            I was born on 28/02/2003 and am currently a student at Duy Tan University
                        </div>
                    </div>
                    <div className={cx('right', 'col-12 col-sm-5')}>
                        <div className={cx('p-3 d-flex flex-column gap-3')}>
                            <div className="form-group">
                                <label>User name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="User name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Re-enter Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
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
