import React from 'react'
import styles from './LectureDetailContent.module.scss'

const NoInformation = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.main}>
          <div className={styles.title}>情報なし</div>
          <div className={styles.content}>
            <p>Titech Info 逆評定は、皆様からいただいた情報をもとに運営しております。</p>
            <p>次回の逆評定集計時にこの科目に関する情報をお寄せいただけると幸いです。</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoInformation
