import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { User } from '../interfaces'
import Pagination from '../components/Pagination'
import UserForm from '../components/userForm'

const USERS_PER_PAGE = 10

const UsersList = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('')
    const [sortBy, setSortBy] = useState('')

    const [currentPage, setCurrentPage] = useState(1)

    const [showForm, setShowForm] = useState(false)
    const [editUser, setEditUser] = useState<User | null>(null)
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null)

    const [toast, setToast] = useState('')

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=0')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load users. Please try again.')
                setLoading(false)
            })
    }, [])

    const showToast = (msg: string) => {
        setToast(msg)
        setTimeout(() => setToast(''), 3000)
    }

    const filteredUsers = users
        .filter(user => {
            const q = searchQuery.toLowerCase()
            if (!q) return true
            return (
                user.firstName.toLowerCase().includes(q) ||
                user.lastName.toLowerCase().includes(q) ||
                user.email.toLowerCase().includes(q)
            )
        })
        .filter(user => (roleFilter ? user.role === roleFilter : true))
        .filter(user => (genderFilter ? user.gender === genderFilter : true))
        .sort((a, b) => {
            if (sortBy === 'name-asc') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
            if (sortBy === 'name-desc') return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
            if (sortBy === 'age-asc') return a.age - b.age
            if (sortBy === 'age-desc') return b.age - a.age
            return 0
        })

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    )

    const uniqueRoles = [...new Set(users.map(u => u.role))].filter(Boolean).sort()

    const handleDelete = (id: number) => {
        fetch(`https://dummyjson.com/users/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                setUsers(prev => prev.filter(u => u.id !== id))
                setDeleteUserId(null)
                showToast('User deleted successfully')
            })
            .catch(() => showToast('Failed to delete user'))
    }

    const handleSave = (userData: Partial<User>) => {
        if (editUser) {
            fetch(`https://dummyjson.com/users/${editUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then(updated => {
                    setUsers(prev => prev.map(u => (u.id === editUser.id ? { ...u, ...updated } : u)))
                    setShowForm(false)
                    setEditUser(null)
                    showToast('User updated successfully')
                })
                .catch(() => showToast('Failed to update user'))
        } else {
            fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then(newUser => {
                    setUsers(prev => [newUser, ...prev])
                    setShowForm(false)
                    showToast('User added successfully')
                })
                .catch(() => showToast('Failed to add user'))
        }
    }

    const openEdit = (user: User) => {
        setEditUser(user)
        setShowForm(true)
    }

    const openAdd = () => {
        setEditUser(null)
        setShowForm(true)
    }

    return (
        <div className="app-wrapper">
            <header className="app-header">
                <Link to="/" className="header-logo">User Management</Link>
                <button className="btn btn-primary" onClick={openAdd}>+ Add User</button>
            </header>

            <main className="main-content">
                <div className="filters-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                    />
                    <div className="filter-select-wrapper">
                        <select className="filter-select" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1) }}>
                            <option value="">All Roles</option>
                            <div >
                                {uniqueRoles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </div>
                        </select>
                        <svg className="filter-select-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    <div className="filter-select-wrapper">
                        <select className="filter-select" value={genderFilter} onChange={e => { setGenderFilter(e.target.value); setCurrentPage(1) }}>
                            <option value="">All Genders</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <svg className="filter-select-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    <div className="filter-select-wrapper">
                        <select className="filter-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1) }}>
                            <option value="">Sort By</option>
                            <option value="name-asc">Name A–Z</option>
                            <option value="name-desc">Name Z–A</option>
                            <option value="age-asc">Age Low–High</option>
                            <option value="age-desc">Age High–Low</option>
                        </select>
                        <svg className="filter-select-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>

                <div className="results-info">Total users: {filteredUsers.length}</div>

                {loading && (
                    <div className="table-wrapper">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>User</th><th>Email</th><th>Phone</th><th>Company</th><th>Role</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(8)].map((_, i) => (
                                    <tr key={i}>
                                        <td><div className="skeleton-row"><div className="skeleton skeleton-avatar" /><div className="skeleton skeleton-text" /></div></td>
                                        <td><div className="skeleton skeleton-text" /></td>
                                        <td><div className="skeleton skeleton-text-sm" /></td>
                                        <td><div className="skeleton skeleton-text-sm" /></td>
                                        <td><div className="skeleton skeleton-badge" /></td>
                                        <td><div className="skeleton skeleton-actions" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {error && <div className="error-state">{error}</div>}

                {!loading && !error && (
                    <>
                        <div className="table-wrapper">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Company</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="no-results">No users found</td>
                                        </tr>
                                    ) : (
                                        paginatedUsers.map(user => (
                                            <tr key={user.id}>
                                                <td className="user-cell">
                                                    <img src={user.image} alt={user.firstName} className="avatar" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}` }} />
                                                    <span className="user-name">{user.firstName} {user.lastName}</span>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.company.name}</td>
                                                <td>
                                                    <span className={`role-badge role-${user.role}`}>{user.role}</span>
                                                </td>
                                                <td className="actions-cell">
                                                    <button className="btn-icon" title="View" onClick={() => navigate(`/users/${user.id}`)}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn-icon btn-icon-edit" title="Edit" onClick={() => openEdit(user)}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn-icon btn-icon-danger" title="Delete" onClick={() => setDeleteUserId(user.id)}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
            </main>

            {showForm && (
                <UserForm
                    user={editUser}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditUser(null) }}
                />
            )}

            {deleteUserId !== null && (
                <div className="modal-overlay" onClick={() => setDeleteUserId(null)}>
                    <div className="modal confirm-modal" onClick={e => e.stopPropagation()}>
                        <h3>Delete User</h3>
                        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteUserId(null)}>Cancel</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(deleteUserId)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {toast && <div className="toast">{toast}</div>}
        </div>
    )
}

export default UsersList
