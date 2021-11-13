import React from 'react'
import Link from 'next/link'
import styles from './LectureCell.module.scss'

interface StaticIndexProps {
  key: string
  id: string
  name: string
  teachers: string[]
  isExist: boolean
}

const LectureCell = (props: StaticIndexProps) => {
  return (
    <div className={`${styles.main} ${props.isExist ? styles.exist : styles.nonExist}`}>
      {props.isExist ? (
        <Link href={`course/${props.id}`}>
          <a className={styles.link}>
            <div>
              {props.name}
              <div className={styles.teachers}>{props.teachers.join(', ')}</div>
            </div>
          </a>
        </Link>
      ) : (
        <div>
          {props.name}
          <div className={styles.teachers}>{props.teachers.join(', ')}</div>
        </div>
      )}
    </div>
  )
}

export default LectureCell
