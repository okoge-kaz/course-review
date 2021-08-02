import style from './LecturesListContent.module.scss'
import React from 'react'
import { Container, Accordion } from 'react-bootstrap'
import LecturesListContentCell from './LecturesListCell'
import { DepartmentCoursesListWithLevel, Course } from '../../interfaces/courselist'

interface StaticIndexProps {
  key: number
  level: number
  courses: Course[]
}

const LecturesListContent = (props: StaticIndexProps) => {
  return (
    <Container className={style.ContainerPadding}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={style.main}>
            <div>{props.level + '00 番台'}</div>
          </Accordion.Header>
          <Accordion.Body>
            {props.courses.map(course => (
              <LecturesListContentCell
                key={course.id}
                id={course.id}
                name={course.courseName}
                teachers={course.teachers}
                evaluation={course.evaluation}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default LecturesListContent
