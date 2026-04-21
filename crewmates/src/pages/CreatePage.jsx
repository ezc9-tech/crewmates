import React, { useState } from 'react'
import '../styles/Pages.css'

function CreatePage({ onAddCrewmate }) {
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '#667eea'
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Convert speed to number
    const crewmateData = {
      ...formData,
      speed: parseInt(formData.speed)
    }

    const success = await onAddCrewmate(crewmateData)
    
    if (success) {
      alert('🚀 Crewmate created successfully!')
      setFormData({
        name: '',
        speed: '',
        color: '#667eea'
      })
    } else {
      alert('Failed to create crewmate. Please try again.')
    }
    
    setSubmitting(false)
  }

  return (
    <div className="create-container">
      <div className="create-header">
        <h1>Create a New Crewmate</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-section">
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

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Crewmate'}
        </button>
      </form>
    </div>
  )
}

export default CreatePage