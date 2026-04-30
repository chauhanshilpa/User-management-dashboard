import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { User } from '../interfaces'

const UserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchUser = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://dummyjson.com/users/${id}`);
        if (!res.ok) throw new Error('User not found');

        const data = await res.json();
        setUser(data);
      } catch {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id])

  if (loading) {
    return (
      <div className="app-wrapper">
        <header className="app-header">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>← Back</button>
          <h1>User Details</h1>
        </header>
        <main className="main-content">
          <div className="details-loading">Loading user details...</div>
        </main>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="app-wrapper">
        <header className="app-header">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>← Back</button>
          <h1>User Details</h1>
        </header>
        <main className="main-content">
          <div className="error-state">{error || 'User not found'}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>← Back</button>
        <h1>User Details</h1>
      </header>

      <main className="main-content">
        <div className="details-container">

          <section className="details-section">
            <h2>Basic Information</h2>
            <div className="details-basic">
              <img
                src={user.image}
                alt={user.firstName}
                className="avatar-large"
                onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=80` }}
              />
              <div className="details-grid">
                <div className="detail-item">
                  <label>Full Name</label>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <span>{user.phone}</span>
                </div>
                <div className="detail-item">
                  <label>Age</label>
                  <span>{user.age}</span>
                </div>
                <div className="detail-item">
                  <label>Gender</label>
                  <span style={{ textTransform: 'capitalize' }}>{user.gender}</span>
                </div>
                <div className="detail-item">
                  <label>Role</label>
                  <span className={`role-badge role-${user.role}`}>{user.role}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h2>Address Information</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Address Line</label>
                <span>{user.address.address}</span>
              </div>
              <div className="detail-item">
                <label>City</label>
                <span>{user.address.city}</span>
              </div>
              <div className="detail-item">
                <label>State</label>
                <span>{user.address.state}</span>
              </div>
              <div className="detail-item">
                <label>Country</label>
                <span>{user.address.country}</span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h2>Company Information</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Company Name</label>
                <span>{user.company.name}</span>
              </div>
              <div className="detail-item">
                <label>Department</label>
                <span>{user.company.department}</span>
              </div>
              <div className="detail-item">
                <label>Title</label>
                <span>{user.company.title}</span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h2>Additional Information</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Birth Date</label>
                <span>{user.birthDate}</span>
              </div>
              <div className="detail-item">
                <label>University</label>
                <span>{user.university}</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default UserDetails
