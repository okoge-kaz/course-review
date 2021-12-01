import styles from './LecturesListCell.module.scss'
import React, { Fragment } from 'react'
import Link from 'next/link'

interface StaticIndexProps {
  key: number
  id: number
  name: string
  teachers: string[]
  evaluation: number
}

const LecturesListContentCell = (props: StaticIndexProps) => {
  return (
    <div className={`${styles.main} ${props.evaluation === 0 ? styles.nonExist : styles.exist}`}>
      {props.evaluation === 0 ? (
        <div>
          {props.name}
          <div className={styles.teachers}>{props.teachers.join(', ')}</div>
        </div>
      ) : (
        <Link href={`../../course/${props.id}`}>
          <a className={styles.link}>
            <div>
              {props.name}
              <div className={styles.teachers}>{props.teachers.join(', ')}</div>
            </div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default LecturesListContentCell
