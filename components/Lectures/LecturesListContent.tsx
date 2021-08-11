import style from './LecturesListContent.module.scss'
import React from 'react'
import { Container, Accordion } from 'react-bootstrap'
import LecturesListContentCell from './LecturesListCell'
import { Course } from '../../interfaces/courselist'

interface StaticIndexProps {
  key: number
  level: number
  courses: Course[]
}

const LecturesListContent = (props: StaticIndexProps) => {
  return (
    <Container className={style.Container}>
      <div className={style.main}>
        <div>{props.level + '00 番台'}</div>
      </div>
      <div>
        {props.courses.map(course => (
          <LecturesListContentCell
            key={course.id}
            id={course.id}
            name={course.courseName}
            teachers={course.teachers}
            evaluation={course.evaluation}
          />
        ))}
      </div>
    </Container>
  )
}

export default LecturesListContent
