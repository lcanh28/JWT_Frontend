import React from 'react';
import classNames from 'classnames/bind';
import style from './Navigation.module.scss';
import config from '../../../config';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Navigation() {
    return (
        <div className={cx('topnav')}>
            <Link to={config.routes.home}>Home</Link>
            <Link to={config.routes.user}>Users</Link>
            <Link to={config.routes.projects}>Projects</Link>
            <Link to={config.routes.login}>Login</Link>
        </div>
    );
}

export default Navigation;
