import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { projects as api } from '../api/client'

export default function ProjectList(){
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.list().then(res=>{
      if(mounted){setItems(res)}
    }).catch(()=>{
      // ignore for now
    }).finally(()=>mounted && setLoading(false))
    return ()=>{mounted=false}
  },[])

  if(loading) return <div className="card">Loading projects...</div>
  return (
    <div>
      <div className="card">
        <h2>Projects</h2>
        {items.length===0 && <div>No projects yet.</div>}
        <ul>
          {items.map(p=> (
            <li key={p.id}><Link to={`/result/${p.results?.[0]?.id ?? ''}`}>{p.name}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
