import { Department } from '../interfaces/segment'
import styles from './ContentsCell.module.scss'
import React from 'react'
import DepartmentCell from './DepartmentCell'
import { Container, Accordion } from 'react-bootstrap'

type ContentsCellProps = {
  key: string
  school: string
  departments: Department[]
}

const ContentsCell = (props: ContentsCellProps) => {
  return (
    <Container className={styles.ContainerPadding}>
      <Accordion>
        <Accordion.Item className={styles.accordion} eventKey="0">
          <Accordion.Header className={styles.main}>
            <div>{props.school}</div>
          </Accordion.Header>

          <Accordion.Body>
            {(props.departments || []).map(department => (
              <DepartmentCell key={department.id} id={department.id} name={department.name} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default ContentsCell
