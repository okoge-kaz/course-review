import React from 'react'
import Link from 'next/link'
import styles from './LectureCell.module.scss'

interface StaticIndexProps {
  key: string
  id: string
  name: string
  teachers: string[]
}

const LectureCell = (props: StaticIndexProps) => {
  return (
    <div className={styles.main}>
      <Link href={`../../course/${props.id}`}>
        <a className={styles.link}>
          <div>
            {props.name}
            <div className={styles.teachers}>
              {props.teachers.join(', ')}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default LectureCell
