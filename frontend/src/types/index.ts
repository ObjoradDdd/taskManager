export interface User {
  id: string
  name: string
  email?: string
}

export interface Result {
  id: string
  title: string
  description?: string
  dueDate?: string
  results?: Result[]
  dependencies?: string[] // result ids that must be completed before this
  assignees?: string[]
}

export interface Project {
  id: string
  name: string
  subject?: string
  results?: Result[]
}
