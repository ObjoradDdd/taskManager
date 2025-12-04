import axios from 'axios'
import type { Project, Result, Task, User } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const client = axios.create({
  baseURL: API_URL,
  timeout: 5000
})

export const projects = {
  list: async (): Promise<Project[]> => {
    const r = await client.get('/projects')
    return r.data
  },
  get: async (id: string): Promise<Project> => {
    const r = await client.get(`/projects/${id}`)
    return r.data
  }
}

export const results = {
  get: async (id: string): Promise<Result> => {
    const r = await client.get(`/results/${id}`)
    return r.data
  }
}

export const tasks = {
  create: async (payload: Partial<Task>) => {
    const r = await client.post('/tasks', payload)
    return r.data
  }
}

export const users = {
  list: async (): Promise<User[]> => {
    const r = await client.get('/users')
    return r.data
  }
}

export default client
