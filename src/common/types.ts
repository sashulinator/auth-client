export interface FindManyParams<T = number> {
  take?: T
  skip?: T
}

export interface SearchQuery {
  searchQuery?: string
}
