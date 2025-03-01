import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete'

const cx = classNames.bind(style);

function Users() {
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(4)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalDele, setIsShowModalDele] = useState(false)
    const [dataModal, setDataModal] = useState({})

    // useEffect(() => {
    //     let session = sessionStorage.getItem('account');
    //     if (!session) {
    //         navigate('/login');
    //     }
    // }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage])
    const fetchUsers = async ()=> {
        try {
            let response = await fetchAllUsers(currentPage, currentLimit);
            if(response && response.data && response.data.EC === 0) {
                setTotalPages(response.data.DT.totalPages);
                setListUsers(response.data.DT.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1)
    };
    const handleDeleteUser = (user) => {
        setIsShowModalDele(true)
        setDataModal(user)
    }
    const handleClose = () => {
        setIsShowModalDele(false)
        setDataModal({})
    }
    const confirmDeleUser = async () => {
        let response = await deleteUser(dataModal)
        if(response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers()
        } else {
            toast.error(response.data.EM)
        }
        setIsShowModalDele(false)
    }

    return (
        <>
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
                                    <th>Action</th>
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
                                                    <td>
                                                        <button className='btn btn-warning me-3'>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><tr><td>Not found Users</td></tr></>
                                }
                            </tbody>
                        </table>
                        {totalPages > 0 && 
                            <div className='users-footer'>
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                    />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ModalDelete 
                show={isShowModalDele}
                handleClose={handleClose}
                confirmDeleUser={confirmDeleUser}
                dataModal={dataModal}
            />
        </>
    );
}

export default Users;
