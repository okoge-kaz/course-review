import React, { FC } from 'react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import styles from './Header.module.scss'

const Header: FC = () => (
  <Container>
    <div className={styles.main}>
      <Link href="/">
        <a className={styles.link}>Titech Info</a>
      </Link>
    </div>
  </Container>
)

export default Header
