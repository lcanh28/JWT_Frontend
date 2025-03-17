import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete'
import ModalUser from './ModalUser';
import { FiRefreshCcw } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const cx = classNames.bind(style);

function Users() {
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([])
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(4)
    const [totalPages, setTotalPages] = useState(0)
    //modal delete user
    const [isShowModalDele, setIsShowModalDele] = useState(false)
    const [dataModalDele, setDataModalDele] = useState({})
    //modal update/create user
    const [actionModalUser, setActionModalUser] = useState("")
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [dataModalUser, setDataModalUser] = useState([])

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
            console.log("check res", response)
            if(response && response.EC === 0) {
                setTotalPages(response.DT.totalPages);
                setListUsers(response.DT.users);
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
        setDataModalDele(user)
    }
    const handleCloseModalDele = () => {
        setIsShowModalDele(false)
        setDataModalDele({})
    }
    const confirmDeleUser = async () => {
        let response = await deleteUser(dataModalDele)
        if(response && response.EC === 0) {
            toast.success(response.EM)
            await fetchUsers()
        } else {
            toast.error(response.EM)
        }
        setIsShowModalDele(false)
    }
    const handleCloseModalUser = async () => {
        setDataModalUser({})
        setIsShowModalUser(false)
        await fetchUsers()
    }
    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }
    const handleRefresh = async () => {
        await fetchUsers()
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container', 'py-5')}>
                    <div className="user-header">
                        <div><h3 className='fs-2 mb-2'>Manage Users</h3></div>
                        <div className='actions mb-3 d-flex'>
                            <button className='btn btn-success me-2 d-flex align-items-center'
                                onClick={() => handleRefresh()}
                            >
                                <FiRefreshCcw className='me-1'/>
                                Refresh
                            </button>
                            <button className='btn btn-primary d-flex align-items-center' 
                                onClick={() => {
                                    setIsShowModalUser(true)
                                    setActionModalUser("CREATE")
                                }}
                            >
                                <FaPlusCircle className='me-1'/>
                                Add new user
                            </button>
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
                                                        <button className='btn btn-warning me-3' title='Edit'
                                                            onClick={() => handleEditUser(item)}
                                                        ><CiEdit /></button>
                                                        <button className='btn btn-danger' title='Delete'
                                                            onClick={() => handleDeleteUser(item)}
                                                        ><MdDeleteOutline /></button>
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
                handleClose={handleCloseModalDele}
                confirmDeleUser={confirmDeleUser}
                dataModalDele={dataModalDele}
            />
            <ModalUser 
                handleClose={handleCloseModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users;
