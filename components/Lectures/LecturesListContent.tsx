import style from './LecturesListContent.module.scss'
import React from 'react'
import LecturesListContentCell from './LecturesListCell'
import { Course } from '../../interfaces/courselist'

interface StaticIndexProps {
  key: number
  level: number
  courses: Course[]
}

const LecturesListContent = (props: StaticIndexProps) => {
  let sortedCourses: Course[] = props.courses.sort((str1, str2) => {
    if (str1.id > str2.id) return 1
    if (str1.id < str2.id) return -1
    return 0
  })
  return (
    <div className={style.Container}>
      <div className={style.main}>
        <div>{props.level + '00 番台'}</div>
      </div>
      <div>
        {sortedCourses.map(course => (
          <LecturesListContentCell
            key={course.id}
            id={course.id}
            name={course.courseName}
            teachers={course.teachers}
            evaluation={course.evaluation}
          />
        ))}
      </div>
    </div>
  )
}

export default LecturesListContent
