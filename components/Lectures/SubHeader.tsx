import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Container } from 'react-bootstrap'

interface StaticIndexProps {
  key: number
  name: string
}

const SubHeader = (props: StaticIndexProps) => (
  <Container className={styles.ContainerPadding}>
    <Container className={styles.JumbotronSize}>
      <h1>{(props.name)}</h1>
    </Container>
  </Container>
)

export default SubHeader
