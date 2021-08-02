import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Jumbotron, Container } from 'react-bootstrap'

const SubHeader: FC = () => (
  <Container className={styles.ContainerPadding}>
    <Jumbotron className={styles.JumbotronSize}>
      <h1>逆評定</h1>
      <p>
        説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと
      </p>
    </Jumbotron>
  </Container>
)

export default SubHeader
