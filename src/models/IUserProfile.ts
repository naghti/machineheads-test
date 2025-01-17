export interface UserProfile {
  id: number
  phone: string
  email: string
  name: string
  lastName: string
  secondName: string
  roles: Role[]
  status: Status
  isActive: boolean
  updatedAt: Date
  createdAt: Date
}

export interface LoginData {
  email: string
  password: string
}


interface Role {
  role: string
  name: string
}

interface Status {
  code: number
  name: string
}
