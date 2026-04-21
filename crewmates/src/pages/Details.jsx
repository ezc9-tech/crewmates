import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import '../styles/Pages.css'

function Details({ crewmates, onUpdateCrewmate, onDeleteCrewmate, initialEditMode = false }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const crewmate = crewmates?.find(c => c.id === parseInt(id))
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [formData, setFormData] = useState(crewmate ? {
    name: crewmate.name,
    speed: crewmate.speed,
    color: crewmate.color
  } : {})
  const [submitting, setSubmitting] = useState(false)

  if (!crewmate) {
    return (
      <div className="create-container">
        <div className="create-header">
          <h1>Crewmate Not Found</h1>
        </div>
        <div className="form-section">
          <p>The crewmate you're looking for doesn't exist.</p>
          <button className="submit-btn" onClick={() => navigate('/gallery')}>
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getSpeedInterpretation = (speed) => {
    if (speed > 10) return 'Fast ⚡'
    if (speed >= 5) return 'Moderate 🟡'
    return 'Slow 🐢'
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const updatedData = {
      ...formData,
      speed: parseInt(formData.speed)
    }

    const success = await onUpdateCrewmate(crewmate.id, updatedData)

    if (success) {
      alert('✅ Crewmate updated successfully!')
      setIsEditing(false)
    } else {
      alert('Failed to update crewmate. Please try again.')
    }

    setSubmitting(false)
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${crewmate.name}? This action cannot be undone.`)) {
      const success = await onDeleteCrewmate(crewmate.id)
      if (success) {
        alert('✅ Crewmate deleted successfully!')
        navigate('/gallery')
      } else {
        alert('Failed to delete crewmate. Please try again.')
      }
    }
  }

  if (isEditing) {
    return (
      <div className="create-container">
        <div className="create-header">
          <h1>Edit {crewmate.name}</h1>
        </div>

        <form onSubmit={handleUpdateSubmit} className="form-section">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Speed in mph:</label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="submit-btn" 
              style={{ background: '#999' }}
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  name: crewmate.name,
                  speed: crewmate.speed,
                  color: crewmate.color
                })
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="create-container">
      <div className="create-header">
        <h1>Crewmate: {crewmate.name}</h1>
        <h2>Stats:</h2>
      </div>

      <div className="form-section">
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#000000' }}>Name of crewmate: <span style={{ color: '#000000' }}>{crewmate.name}</span></h3>
          <h3 style={{ color: '#000000' }}>Speed of crewmate: <span style={{ color: '#000000' }}>{crewmate.speed} mph ({getSpeedInterpretation(crewmate.speed)})</span></h3>
          <h3 style={{ color: '#000000' }}>Color of crewmate: <span style={{ color: '#000000' }}>{crewmate.color}</span></h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <button className="submit-btn" onClick={() => setIsEditing(true)}>
            Edit Crewmate
          </button>
          <button className="submit-btn" style={{ background: '#dc3545' }} onClick={handleDelete}>
            Delete
          </button>
          <button className="submit-btn" style={{ background: '#999' }} onClick={() => navigate('/gallery')}>
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details