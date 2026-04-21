import React from 'react'
import { Link } from 'react-router'
import '../styles/Sidebar.css'

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1>🚀 Crewmates</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/gallery" className="nav-link">Gallery</Link>
        </li>
        <li>
          <Link to="/create" className="nav-link">Create</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar