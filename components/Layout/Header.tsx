import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from './Header.module.scss'

const Header: FC = () => (
  <Container>
    <div className={styles.main}>Titech Info</div>
  </Container>
)

export default Header
