import styles from './LecturesListCell.module.scss'
import React from 'react'
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
    <div className={styles.main}>
      <Link href={`../../course/${props.id}`}>
      {/* props.idとすると授業番号固有の番号になる */}
        <a className={styles.link}>
          <div>
            {props.name}
            <div className={styles.teachers}>
              {props.teachers.map(teacher => (
                <div className={styles.teacher}>{teacher}</div>
              ))}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default LecturesListContentCell
