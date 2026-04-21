import React from 'react'
import { useNavigate } from 'react-router'
import '../styles/Pages.css'

function CrewmatGallery(props) {
  const { data, loading } = props
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="gallery-header">
          <h1>Your Crewmate Gallery!</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading crewmates...</p>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="gallery-container">
        <div className="gallery-header">
          <h1>Your Crewmate Gallery!</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No crewmates yet. Create your first one!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Your Crewmate Gallery!</h1>
      </div>

      <div className="gallery-grid">
        {data.map((crewmate) => (
          <div key={crewmate.id} className="gallery-item">
            <div 
              className="gallery-item-image" 
              style={{ backgroundColor: crewmate.color }}
            />
            <div className="gallery-item-content">
              <h3 className="gallery-item-title">Name: {crewmate.name}</h3>
              <p className="gallery-item-desc">Speed: {crewmate.speed} mph</p>
              <p className="gallery-item-desc">Color: {crewmate.color}</p>
              <div style={{ marginTop: '10px' }}>
                <button className="edit-btn" onClick={() => navigate(`/gallery/${crewmate.id}`)}>
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CrewmatGallery