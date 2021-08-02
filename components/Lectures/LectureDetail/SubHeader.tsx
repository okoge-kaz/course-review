import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Container } from 'react-bootstrap'

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
    <Container className={styles.JumbotronSize}>
      <h1>{props.name}</h1>
      <p>教員：{displayTeachers}</p>
    </Container>
  </Container>
)

}
  

export default SubHeader
