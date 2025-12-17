export interface User {
  id: number | string
  displayName: string
  email?: string
}

export interface Result {
  id: number | string
  title: string
  description?: string
  deadline?: string
  status?: "COMPLETED" | "IN_PROGRESS" | "CREATED" | string
  results?: Result[]
  dependentIds?: (number | string)[] // result ids that depend on this
  codependentIds?: (number | string)[] // result ids that this depends on
  assignedUsers?: User[]
}

export interface Project {
  id: number | string
  name: string
  subject?: string
  results?: Result[]
}
