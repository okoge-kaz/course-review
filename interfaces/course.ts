export interface CourseDetail {
  keywords: string[]
  teachers: string[]
  courseName: string
  id: string
}

export interface Evaluation<T> {
  distributes: Distribution<T>[]
}

export interface Distribution<T> {
  percent: number
  item: T
}

export interface CourseAssessment {
  assessmentMaterials: string[]
  courseNumber: string
  questionPapersRetrieve: number
  badPoints: string[]
  endQuarter: number
  goodPoints: string[]
  reviewersEvaluation: Evaluation<ReviewersEvaluation>
  otherComments: string[]
  teachers: string[]
  year: number
  courseName: string
  compulsoryOrElective: Evaluation<CompulsoryOrElective>
  understandability: Evaluation<Understandability>
  department: string
  courseId: string
  startQuarter: number
  grade: Evaluation<Grade>
  jaReportLetters: string
  enReportWords: string
  examDifficulty: Evaluation<ExamDifficulty>
  attendanceRate: Evaluation<AttendanceRate>
  passRate: number
}

export const Understandability = {
  VeryDifficult: 1,
  Difficult: 2,
  Soso: 3,
  Easy: 4,
  VeryEasy: 5,
} as const

export type Understandability = typeof Understandability[keyof typeof Understandability]

export const ReviewersEvaluation = {
  VeryBad: 1,
  Bad: 2,
  Soso: 3,
  Good: 4,
  VeryGood: 5,
} as const

export type ReviewersEvaluation = typeof ReviewersEvaluation[keyof typeof ReviewersEvaluation]

export const ExamDifficulty = {
  NoExam: -1,
  Easy: 1,
  Soso: 2,
  Difficult: 3
} as const

export type ExamDifficulty = typeof ExamDifficulty[keyof typeof ExamDifficulty]

export const CompulsoryOrElective = {
  Compulsory: 1,
  CompulsoryElective: 2,
  Elective: 3
} as const

export type CompulsoryOrElective = typeof CompulsoryOrElective[keyof typeof CompulsoryOrElective]

export const QuestionPapersRetrieve = {
  NoExam: -1,
  Unkown: 0,
  Yes: 1,
  No: 2
} as const

export type QuestionPapersRetrieve = typeof QuestionPapersRetrieve[keyof typeof QuestionPapersRetrieve]

export const Grade = {
  Failed: 1,
  From60To69: 2,
  From70To79: 3,
  From80To89: 4,
  from90To100: 5,
  Passed: 6
} as const

export type Grade = typeof Grade[keyof typeof Grade]

export const AttendanceRate = {
  OnlyExam: -1,
  LessThan30Percent: 1,
  From30PercentTo50percent: 2,
  From50PercentTo80percent: 3,
  Over80percent: 4
} as const

export type AttendanceRate = typeof AttendanceRate[keyof typeof AttendanceRate]