export interface FindManyParams<T = number> {
  take?: T
  skip?: T
}

export interface SearchQuery {
  searchQuery?: string
}

export interface CreateUser {
  username: string
  password: string
  email: string
  fullname: string
}

export interface UpdateUser extends CreateUser {
  id: string
}
