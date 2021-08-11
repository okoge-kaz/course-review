import { Department } from '../interfaces/segment'
import styles from './ContentsCell.module.scss'
import React from 'react'
import DepartmentCell from './DepartmentCell'

type ContentsCellProps = {
  key: string
  school: string
  departments: Department[]
}

const ContentsCell = (props: ContentsCellProps) => {
  return (
    <div className={styles.Container}>
      <div className={styles.main}>
        <div>{props.school}</div>
      </div>
      <div>
        {(props.departments || []).map(department => (
          <DepartmentCell key={department.id} id={department.id} name={department.name} />
        ))}
      </div>
    </div>
  )
}

export default ContentsCell
