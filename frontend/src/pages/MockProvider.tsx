import React from 'react'
import sample from '../mocks/sample.json'

export default function MockProvider(){
  return (
    <div className="card">
      <h2>Mock Data</h2>
      <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(sample,null,2)}</pre>
    </div>
  )
}
