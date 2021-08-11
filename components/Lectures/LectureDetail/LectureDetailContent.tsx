import React from 'react'
import styles from './LectureDetailContent.module.scss'
import Image from 'next/image'
import { CourseAssessment } from '../../../interfaces/course'

interface StaticIndexProps {
  courseReview: CourseAssessment
}

const LecturesListContent = (props: StaticIndexProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>基本情報</div>

        <div>
          <p>
            <span className={styles.subtitle}>教員</span>

            <span className={styles.teachersList}>
              {props.courseReview.teachers.join(', ')}
            </span>
          </p>
          <p>
            {' '}
            <span className={styles.subtitle}>講義コード </span>
            <span className={styles.teachersList}>{props.courseReview.courseNumber}</span>
          </p>
          <p>
            <span className={styles.subtitle}>開講年度 </span>
            <span className={styles.teachersList}>{props.courseReview.year}年度</span>
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
            {(props.courseReview.goodPoints || []).map(goodpoint => (
              <li>{goodpoint}</li>
            ))}
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>悪い点</div>
            {(props.courseReview.badPoints || []).map(badpoint => (
              <li>{badpoint}</li>
            ))}
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>その他</div>
            {(props.courseReview.otherComments || []).map(othercomment => (
              <li>{othercomment}</li>
            ))}
          </div>
        </div>

        <div className={styles.title}>詳細情報</div>

        <div className={styles.content}>
          <div className={styles.subtitle}>わかりやすさ</div>
          <Image src="/image/evaluation.png" width="329" height="400" alt="evaluation" />
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>評価項目</div>
          {(props.courseReview.assessmentMaterials || []).map(material => (
            <li>{material}</li>
          ))}
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

        <div className={styles.content}>
          <div className={styles.subtitle}>試験問題は持ち帰れたか</div>
          {props.courseReview.questionPapersRetrieve === 1 ? (
            <li>持ち帰れた</li>
          ) : props.courseReview.questionPapersRetrieve === 0 ? (
            <li>持ち帰れなかった</li>
          ) : (
            <li>試験なし</li>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>レポート字数(日本語)</div>
          <li>{props.courseReview.jaReportLetters}</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>レポート字数(English)</div>
          <li>{props.courseReview.enReportWords}</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>単位取得率</div>
          <li>{props.courseReview.passRate}%</li>
        </div>
      </div>
    </div>
  )
}

export default LecturesListContent
