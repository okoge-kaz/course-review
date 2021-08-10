import React from 'react'
import styles from './SubHeader.module.scss'

interface StaticIndexProps {
  key: number
  name: string
}

const SubHeader = (props: StaticIndexProps) => (
  <div className={styles.Container}>
    <h1>{props.name}</h1>
  </div>
)

export default SubHeader
