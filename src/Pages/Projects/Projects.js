import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Projects.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Projects() {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'py-5')}>
                <div className="row">
                    <div className={cx('left', 'col-7 d-none d-sm-block mt-5')}>
                        <div className={cx('brand')}>Lê Công Anh</div>
                        <div className={cx('detail')}>Projects</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
