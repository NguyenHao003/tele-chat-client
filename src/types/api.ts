export type ApiResponse<T> = {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export type PaginationResponse<T> = {
  metadata: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
  items: T[]
}

export type BaseQueryParams = {
  keyword?: string
  page?: number
  pageSize?: number
  sortField?: string
  sortOrder?: 'ASC' | 'DESC'
}
