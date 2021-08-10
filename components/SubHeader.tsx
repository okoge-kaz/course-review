import React, { FC } from 'react'
import styles from './SubHeader.module.scss'
import { Container } from 'react-bootstrap'

const SubHeader: FC = () => (
  <Container className={styles.ContainerPadding}>
    <Container className={styles.JumbotronSize}>
      <h1>逆評定</h1>
      <p>
        皆さんから頂いた情報を元に東工大の講義について、課題や難易度などの情報をまとめています。
        講義を選ぶ際などの参考にして下さい。
      </p>
    </Container>
  </Container>
)

export default SubHeader
