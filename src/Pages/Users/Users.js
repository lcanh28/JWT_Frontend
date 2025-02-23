import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../../services/userService';

const cx = classNames.bind(style);

function Users() {
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async ()=> {
        try {
            let response = await fetchAllUsers();
            if(response && response.data && response.data.EC === 0) {
                setListUsers(response.data.DT);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'py-5')}>
                <div className="user-header">
                    <div><h3 className='fs-2'>Table Users</h3></div>
                    <div className='actions'>
                        <button className='btn btn-success'>Refesh</button>
                        <button className='btn btn-primary'>Add new user</button>
                    </div>
                </div>
                <div className='user-body'>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>User Name</th>
                                <th>Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <><tr><td>Not found Users</td></tr></>
                            }
                        </tbody>
                    </table>
                    <footer className='users-footer'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Users;
