import React from 'react'
import styles from './SubHeader.module.scss'

interface StaticIndexProps {
  key: string
  id: string
  name: string
  teachers: string[]
}

const SubHeader = (props: StaticIndexProps) => {
  const displayTeachers = props.teachers.length > 1 ? props.teachers[0] + ' 他' : props.teachers[0]
  return (
    <div className={styles.Container}>
      <h1>{props.name}</h1>
      <p>教員：{displayTeachers}</p>
    </div>
  )
}

export default SubHeader
