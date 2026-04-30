import { useState, type ChangeEvent } from 'react'
import type { User } from '../interfaces'

interface Props {
  user: User | null
  onSave: (data: Partial<User>) => void
  onClose: () => void
}

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  gender: string
  role: string
  image: string
  address: string
  city: string
  state: string
  country: string
  companyName: string
  department: string
  title: string
}

const emptyForm: FormState = {
  firstName: '', lastName: '', email: '', phone: '',
  age: '', gender: '', role: '', image: '',
  address: '', city: '', state: '', country: '',
  companyName: '', department: '', title: '',
}

const userToForm = (user: User | null): FormState => {
  if (!user) return emptyForm
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: String(user.age),
    gender: user.gender,
    role: user.role,
    image: user.image || '',
    address: user.address.address,
    city: user.address.city,
    state: user.address.state,
    country: user.address.country,
    companyName: user.company.name,
    department: user.company.department,
    title: user.company.title,
  }
}

const UserForm = ({ user, onSave, onClose }: Props) => {
  const [form, setForm] = useState<FormState>(() => userToForm(user))
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs: Partial<FormState> = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.age) errs.age = 'Required'
    else if (isNaN(Number(form.age)) || Number(form.age) < 1) errs.age = 'Invalid age'
    if (!form.gender) errs.gender = 'Required'
    if (!form.role.trim()) errs.role = 'Required'
    return errs
  }

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSave({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      age: Number(form.age),
      gender: form.gender,
      role: form.role,
      image: form.image,
      address: {
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
      },
      company: {
        name: form.companyName,
        department: form.department,
        title: form.title,
      },
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal form-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? 'Edit User' : 'Add New User'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-section">
            <h3>Personal Info</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" />
                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age *</label>
                <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} placeholder="Age" />
                {errors.age && <span className="form-error">{errors.age}</span>}
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className="form-error">{errors.gender}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role *</label>
                <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. admin, user" />
                {errors.role && <span className="form-error">{errors.role}</span>}
              </div>
              <div className="form-group">
                <label>Profile Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address</h3>
            <div className="form-group">
              <label>Address Line</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
            </div>
          </div>

          <div className="form-section">
            <h3>Company</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company name" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Job title" />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{user ? 'Update User' : 'Add User'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
