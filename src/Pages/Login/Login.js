import React from 'react';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Link } from 'react-router-dom';
import config from '../../config';

const cx = classNames.bind(style);

function Login() {
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
                            <input className="form-control" type="text" placeholder="Email address or phone number" />
                            <input className="form-control" type="password" placeholder="Password" />
                            <button className="btn btn-primary">Login</button>
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
