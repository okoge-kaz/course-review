// import { Department } from '../../interfaces/segment'
import styles from './DepartmentCell.module.scss'
import React from 'react'
import Link from 'next/link'

type DepartmentCellProps = {
  key: number
  id: number
  name: string
}

const DepartmentCell = (props: DepartmentCellProps) => {
  return (
    <div className={styles.main}>
      <Link href={`department/${props.id}`}>
        <a className={styles.link}>
          <div key={props.id}>{props.name}</div>
        </a>
      </Link>
    </div>
  )
}

export default DepartmentCell
