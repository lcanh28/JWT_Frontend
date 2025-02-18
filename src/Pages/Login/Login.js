import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Link } from 'react-router-dom';
import config from '../../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';

const cx = classNames.bind(style);

function Login() {
    const navigate = useNavigate();
    const [accountLogin, setAccountLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultValidInput = {
        isValidAccountLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultValidInput);

    const handleLogin = async () => {
        setObjValidInput(defaultValidInput);
        if (!accountLogin) {
            setObjValidInput({ ...defaultValidInput, isValidAccountLogin: false });
            toast.error("The email address or mobile number you entered isn't connected to an account.");
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultValidInput, isValidPassword: false });
            toast.error("The password that you've entered is incorrect. Forgotten password?");
            return;
        }
        let response = await loginUser(accountLogin, password);
        //successfull
        if (response && response.data && +response.data.EC === 0) {
            toast.success(response.data.EM);

            let data = {
                isUser: true,
                token: 'fake token',
            };
            sessionStorage.setItem('account', JSON.stringify(data));
            navigate('/user');
        }
        //error
        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
    }
    const handlePressEnter = (event) => {
        if(event.charCode === 13 && event.code === "Enter") {
            handleLogin()
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'py-5')}>
                <div className="row">
                    <div className={cx('left', 'col-7 d-none d-sm-block mt-5')}>
                        <div className={cx('brand')}>Learn Web</div>
                        <div className={cx('detail')}>We will provide you with valuable and insightful knowledge</div>
                    </div>
                    <div className={cx('col-12 col-sm-5 px-5')}>
                        <div className={cx('right', 'p-3 d-flex flex-column gap-3')}>
                            <input
                                className={
                                    objValidInput.isValidAccountLogin ? 'form-control' : 'is-invalid form-control'
                                }
                                type="text"
                                placeholder="Email address or phone number"
                                value={accountLogin}
                                onChange={(e) => {
                                    setAccountLogin(e.target.value);
                                }}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                            <input
                                className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                            <button className="btn btn-primary" onClick={() => handleLogin()}>
                                Login
                            </button>
                            <span className={cx('text-primary text-center')}>
                                <Link>Forgotten password?</Link>
                            </span>
                            <hr />
                            <div className="text-center">
                                <Link to={config.routes.register} className="btn btn-info">
                                    Create new account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
