export interface DepartmentCoursesListWithLevel {
  level: number
  courses: Course[]
}

export interface Course {
  id: number
  courseName: string
  teachers: string[]
  evaluation: number
}