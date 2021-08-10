import React, { FC } from 'react'
import styles from './SubHeader.module.scss'

const SubHeader: FC = () => (
  <div className={styles.Container}>
    <h1>逆評定</h1>
    <p>
      皆さんから頂いた情報を元に東工大の講義について、課題や難易度などの情報をまとめています。
      講義を選ぶ際などの参考にして下さい。
    </p>
  </div>
)

export default SubHeader
