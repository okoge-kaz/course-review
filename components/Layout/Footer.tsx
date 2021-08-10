import React, { FC } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

const link =
  'https://docs.google.com/forms/d/e/1FAIpQLSfIW7Dz5UWB4wb75k5zgJk46Y_2bmVm2EUUYTZBOOPBHhleXA/viewform'

const Footer: FC = () => (
  <div className={styles.main}>
    <div className={styles.text}>
      <Link href={link}>
        <a className={styles.link}>CONTACT US</a>
      </Link>
    </div>
    <div className={styles.text}>Copyright 2021 Titech Info</div>
  </div>
)

export default Footer
