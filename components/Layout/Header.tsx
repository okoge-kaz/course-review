import React, { FC } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header: FC = () => (
  <div className={styles.Container}>
    <div className={styles.main}>
      <Link href="/">
        <a className={styles.link}>Titech Info</a>
      </Link>
    </div>
  </div>
)

export default Header
