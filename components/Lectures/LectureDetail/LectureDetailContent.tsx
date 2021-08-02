import React from 'react'
import styles from './LectureDetailContent.module.scss'
import { Container } from 'react-bootstrap'
import Image from 'next/image'

interface StaticIndexProps {
  key: string
  id: string
  name: string
  teachers: string[]
}

const LecturesListContent = (props: StaticIndexProps) => {
  return (
    <Container className={styles.ContainerPadding}>
      <div className={styles.main}>
        <div className={styles.title}>基本情報</div>

        <div>
          <p>
            <span className={styles.subtitle}>教員</span>
            <span className={styles.teachersList}>
              {(props.teachers || []).map(teacher => (
                <span>{teacher + ' '}</span>
              ))}
            </span>
          </p>
          <p>
            <div className={styles.subtitle}>総合評価</div>
            <Image src="/image/evaluation.png" width="329" height="400" alt="evaluation" />
          </p>
        </div>

        <div className={styles.title}>受講者コメント</div>

        <div>
          <div className={styles.content}>
            <div className={styles.subtitle}>良い点</div>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>悪い点</div>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>その他</div>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
            <li>てきすとてきすとてきすとてきすとてきすと</li>
          </div>
        </div>

        <div className={styles.title}>詳細情報</div>

        <div className={styles.content}>
          <div className={styles.subtitle}>わかりやすさ</div>
          <Image src="/image/evaluation.png" width="329" height="400" alt="evaluation" />
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>評価項目</div>
          <li>小テスト</li>
          <li>期末試験</li>
          <li>中間レポート</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>レポートの内容</div>
          <li>てきすとてきすとてきすと</li>
          <li>てきすとてきすとてきすと</li>
          <li>てきすとてきすとてきすと</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>試験の詳細</div>
          <li>ちょーむずかしかった</li>
          <li>授業聞くよりも教科書読め</li>
          <li>難易度は高め</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>点数</div>
          <Image src="/image/evaluation.png" width="329" height="400" alt="evaluation" />
        </div>
      </div>
    </Container>
  )
}

export default LecturesListContent
