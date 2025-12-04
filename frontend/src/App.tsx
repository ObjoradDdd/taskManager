import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProjectList from './pages/ProjectList'
import ResultDetail from './pag'
import MockProvider from './pages/MockProvider'

export default function App(){
  return (
    <div className="app-container">
      <header className="header">
        <h1>hello world</h1>
        <nav>
          <Link className="link" to="/">Projects</Link>
          <Link className="link" to="/mock">Mock Data</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProjectList/>} />
          <Route path="/result/:id" element={<ResultDetail/>} />
          <Route path="/mock" element={<MockProvider/>} />
        </Routes>
      </main>
    </div>
  )
}
