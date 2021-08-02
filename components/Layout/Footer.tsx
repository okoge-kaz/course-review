import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import styles from './Footer.module.css'

const Footer: FC = () => (
  <div className={styles.main}>
    <div className={styles.text}>CONTACT US</div>
    <div className={styles.text}>Copyright 2021 Titech Info</div>
  </div>
)

export default Footer
