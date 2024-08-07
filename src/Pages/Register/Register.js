import React from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import config from '../../config';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Register() {
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
                            <div class="form-group">
                                <label>User name:</label>
                                <input type="text" class="form-control" placeholder="User name" />
                            </div>
                            <div class="form-group">
                                <label>Email address or phone number:</label>
                                <input type="text" class="form-control" placeholder="Enter email or phone number" />
                            </div>
                            <div class="form-group">
                                <label>Phone number:</label>
                                <input type="text" class="form-control" placeholder="Phone number" />
                            </div>
                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" class="form-control" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label>Re-enter Password:</label>
                                <input type="password" class="form-control" placeholder="Re-enter Password" />
                            </div>
                            <button className="btn btn-primary">Register</button>
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
