import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Jumbotron, Container } from 'react-bootstrap'

interface StaticIndexProps {
  key: string
  id: string
  name: string
  teachers: string[]
}

const SubHeader = (props: StaticIndexProps) => {
  const displayTeachers = (props.teachers).length > 1 ?(props.teachers[0] + ' 他') : props.teachers[0]
  return (
    <Container className={styles.ContainerPadding}>
    <Jumbotron className={styles.JumbotronSize}>
      <h1>{props.name}</h1>
      <p>教員：{displayTeachers}</p>
    </Jumbotron>
  </Container>
)

}
  

export default SubHeader
