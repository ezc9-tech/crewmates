import React from 'react'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to the Crewmate Creator!</h1>
        <p className="hero-subtitle">Create your very own set of crewmates before sending them off into space!</p>
      </div>
      
      <div className="gallery-preview">
        <div className="image-card">
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd8a2c58?w=600&h=400&fit=crop" alt="group of crewmates" className="hero-image" />
          <h3>Choose Your Colors</h3>
          <p>Select from vibrant color combinations</p>
        </div>
        
        <div className="image-card">
          <img src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop" alt="space ship" className="hero-image" />
          <h3>Explore Space</h3>
          <p>Send your crewmates on epic adventures</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Create new crewmates or explore the gallery to see what others have made!</p>
        <div className="button-group">
          <a href="/create" className="btn btn-primary">Create Now</a>
          <a href="/gallery" className="btn btn-secondary">View Gallery</a>
        </div>
      </div>
    </div>
  )
}

export default Home