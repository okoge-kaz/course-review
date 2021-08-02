import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from './Header.module.css'

const Header: FC = () => (
  <Container>
    <div className={styles.main}>Titech Info</div>
  </Container>
)

export default Header
