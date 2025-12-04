export interface User {
  id: string
  name: string
  email?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string // ISO date
  assignees?: string[] // user ids
  completed?: boolean
}

export interface Result {
  id: string
  title: string
  description?: string
  dueDate?: string
  tasks?: Task[]
  dependencies?: string[] // result ids that must be completed before this
  assignees?: string[]
}

export interface Project {
  id: string
  name: string
  subject?: string
  results?: Result[]
}
