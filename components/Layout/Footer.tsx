import React, { FC } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

const link = 'https://twitter.com/tech_techfrom18'
const privacyPolicyLink = 'https://titech.app/products/titechinfo/course_review/privacy_policy/'

const Footer: FC = () => (
  <div className={styles.Container}>
    <div className={styles.main}>
      <div className={styles.text}>
        <Link href={link}>
          <a className={styles.link}>CONTACT US</a>
        </Link>
        <Link href={privacyPolicyLink}>
          <a className={styles.link}>Privacy Policy</a>
        </Link>
      </div>
      <div className={styles.text}>Copyright 2021 Titech Info</div>
    </div>
  </div>
)

export default Footer
