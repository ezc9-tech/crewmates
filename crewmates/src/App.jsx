import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { supabase } from './utils/supabaseClient'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import CrewmatGallery from './pages/CrewmatGallery'
import CreatePage from './pages/CreatePage'
import Details from './pages/Details'
import './styles/App.css'

function App() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch crewmates from Supabase
  useEffect(() => {
    fetchCrewmates()
  }, [])

  const fetchCrewmates = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
      
      if (error) {
        setError(error.message)
        console.error('Error fetching crewmates:', error)
      } else {
        setCrewmates(data || [])
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Add new crewmate
  const addCrewmate = async (crewmate) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([crewmate])
        .select()

      if (error) {
        setError(error.message)
        console.error('Error adding crewmate:', error)
        return false
      } else {
        setCrewmates([...crewmates, ...data])
        return true
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
      return false
    }
  }

  // Update crewmate
  const updateCrewmate = async (id, updatedCrewmate) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .update(updatedCrewmate)
        .eq('id', id)
        .select()

      if (error) {
        setError(error.message)
        console.error('Error updating crewmate:', error)
        return false
      } else {
        setCrewmates(crewmates.map(c => c.id === id ? data[0] : c))
        return true
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
      return false
    }
  }

  // Delete crewmate
  const deleteCrewmate = async (id) => {
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
        console.error('Error deleting crewmate:', error)
        return false
      } else {
        setCrewmates(crewmates.filter(c => c.id !== id))
        return true
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
      return false
    }
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>Error: {error}</div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<CrewmatGallery data={crewmates} loading={loading} />}></Route>
            <Route path="/create" element={<CreatePage onAddCrewmate={addCrewmate} />}></Route>
            <Route path="/gallery/:id/edit" element={<Details crewmates={crewmates} onUpdateCrewmate={updateCrewmate} onDeleteCrewmate={deleteCrewmate} initialEditMode={true} />} />
            <Route path="/gallery/:id" element={<Details crewmates={crewmates} onUpdateCrewmate={updateCrewmate} onDeleteCrewmate={deleteCrewmate} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App