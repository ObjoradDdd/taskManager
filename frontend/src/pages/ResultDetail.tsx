import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import type { Result } from '../types'
import { results as api } from '../api/client'

export default function ResultDetail(){
  const { id } = useParams()
  const [item, setItem] = useState<Result | null>(null)

  useEffect(()=>{
    if(!id) return
    api.get(id).then(r=>setItem(r)).catch(()=>{/*ignore*/})
  },[id])

  if(!item) return <div className="card">No result found</div>

  return (
    <div className="card">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Due: {item.dueDate}</p>
      <div style={{marginTop:12}}>
        <h3>Tasks (preview)</h3>
        <ul>
          {item.tasks?.map(t=> <li key={t.id}>{t.title} {t.dueDate && `— ${t.dueDate}`}</li>)}
        </ul>
      </div>
      <div style={{marginTop:12}}>
        <h3>Reverse Gantt (placeholder)</h3>
        <div style={{height:180,background:'#f0f4ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>Visualization will appear here</div>
      </div>
    </div>
  )
}
