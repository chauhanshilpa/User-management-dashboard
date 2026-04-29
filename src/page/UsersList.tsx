import React, { useState, useEffect } from 'react'
import type { User } from '../interfaces';
import Pagination from '../components/Pagination';

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => setUsers(data.users));
    }, [])

    const getFullName = (firstName: string, lastName: string): string =>
        `${firstName} ${lastName}`;

    return (
        <div>
            <div>{users.length} users found</div>
            <table>
                <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>COMPANY</th>
                    <th>ROLE</th>
                    <th>ACTIONS</th>
                </tr>
                {users?.map((userData: User) =>
                    <tr>
                        <td>{getFullName(userData.firstName, userData.firstName)}</td>
                        <td>{userData.email}</td>
                        <td>{userData.phone}</td>
                        <td>{userData.company.name}</td>
                        <td>{userData.role}</td>
                        <td>
                            <td>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3M3 15V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9M3 15h18M8 15v4m4-4v4m4-4v4m-5.5061-7.4939L12 10m0 0 1.5061-1.50614M12 10l1.5061 1.5061M12 10l-1.5061-1.50614" />
                                </svg>
                            </td>
                        </td>
                    </tr>
                )}
            </table>
            <Pagination />
        </div>
    )
}

export default UsersList
