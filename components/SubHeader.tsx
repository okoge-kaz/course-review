import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Container } from 'react-bootstrap'

const SubHeader: FC = () => (
  <Container className={styles.ContainerPadding}>
    <Container className={styles.JumbotronSize}>
      <h1>逆評定</h1>
      <p>
        説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと説明のてきすと
      </p>
    </Container>
  </Container>
)

export default SubHeader
