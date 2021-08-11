import React from 'react'
import styles from '../Lectures/LectureDetail/LectureDetailContent.module.scss'

const Warning = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.main}>
          <div className={styles.title}>Enterを押してください</div>
          <div className={styles.content}>
            <p>検索をするには、 Enter(Return)キーを押してください。</p>
            <p>検索窓の文字をすべて削除すると一覧に戻ります。</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Warning
