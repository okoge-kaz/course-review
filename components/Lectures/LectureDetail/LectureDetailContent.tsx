import React from 'react'
import styles from './LectureDetailContent.module.scss'

import {
  AttendanceRate,
  CompulsoryOrElective,
  CourseAssessment,
  ExamDifficulty,
  Grade,
  QuestionPapersRetrieve,
  ReviewersEvaluation,
  Understandability,
} from '../../../interfaces/course'

interface StaticIndexProps {
  courseReview: CourseAssessment
}

const reviewersEvaluationText = (reviewersEvaluation: ReviewersEvaluation) => {
  switch (reviewersEvaluation) {
    case ReviewersEvaluation.VeryBad:
      return 'ひどかった'
    case ReviewersEvaluation.Bad:
      return 'あまり良くなかった'
    case ReviewersEvaluation.Soso:
      return '普通'
    case ReviewersEvaluation.Good:
      return '比較的良かった'
    case ReviewersEvaluation.VeryGood:
      return '大変良かった'
    default: {
      /* eslint no-undef: off */
      const _: never = reviewersEvaluation
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const understandabilityText = (understandability: Understandability) => {
  switch (understandability) {
    case Understandability.VeryDifficult:
      return '分かりづらかった'
    case Understandability.Difficult:
      return '比較的分かりづらかった'
    case Understandability.Soso:
      return '普通'
    case Understandability.Easy:
      return '比較的分かりやすかった'
    case Understandability.VeryEasy:
      return 'かなり分かりやすかった'
    default: {
      /* eslint no-undef: off */
      const _: never = understandability
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const examDifficultyText = (examDifficulty: ExamDifficulty) => {
  switch (examDifficulty) {
    case ExamDifficulty.NoExam:
      return '試験はなかった'
    case ExamDifficulty.Easy:
      return '簡単だった'
    case ExamDifficulty.Soso:
      return '普通'
    case ExamDifficulty.Difficult:
      return '難しかった'
    default: {
      /* eslint no-undef: off */
      const _: never = examDifficulty
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const attendanceRateText = (attendanceRate: AttendanceRate) => {
  switch (attendanceRate) {
    case AttendanceRate.OnlyExam:
      return 'テストのみ'
    case AttendanceRate.LessThan30Percent:
      return '3割以下'
    case AttendanceRate.From30PercentTo50percent:
      return '3割から5割未満'
    case AttendanceRate.From50PercentTo80percent:
      return '5割から8割未満'
    case AttendanceRate.Over80percent:
      return '8割以上'
    default: {
      /* eslint no-undef: off */
      const _: never = attendanceRate
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const compulsoryOrElectiveText = (compulsoryOrElective: CompulsoryOrElective) => {
  switch (compulsoryOrElective) {
    case CompulsoryOrElective.Compulsory:
      return '必修'
    case CompulsoryOrElective.CompulsoryElective:
      return '選択必修'
    case CompulsoryOrElective.Elective:
      return '選択'
    default: {
      /* eslint no-undef: off */
      const _: never = compulsoryOrElective
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const gradeText = (grade: Grade) => {
  switch (grade) {
    case Grade.Failed:
      return '落第した'
    case Grade.From60To69:
      return '60点台'
    case Grade.From70To79:
      return '70点台'
    case Grade.From80To89:
      return '80点台'
    case Grade.from90To100:
      return '90点台or100点'
    case Grade.Passed:
      return '合格(合否科目の場合)'
    default: {
      /* eslint no-undef: off */
      const _: never = grade
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const questionPapersRetrieveText = (questionPapersRetrieve: QuestionPapersRetrieve) => {
  switch (questionPapersRetrieve) {
    case QuestionPapersRetrieve.NoExam:
      return '試験なし'
    case QuestionPapersRetrieve.Unkown:
      return '不明'
    case QuestionPapersRetrieve.Yes:
      return 'はい'
    case QuestionPapersRetrieve.No:
      return 'いいえ'
    default: {
      /* eslint no-undef: off */
      const _: never = questionPapersRetrieve
      /* eslint no-console: off */
      console.error(`${_} is unexpected value`)
      return ''
    }
  }
}

const LecturesListContent = (props: StaticIndexProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>基本情報</div>

        <div>
          <p>
            <span className={styles.subtitle}>教員</span>
            <span className={styles.teachersList}>{props.courseReview.teachers.join(', ')}</span>
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
            {props.courseReview.reviewersEvaluation.distributes.map(distribute => (
              <div key={distribute.item}>
                <label htmlFor={reviewersEvaluationText(distribute.item)}>
                  {reviewersEvaluationText(distribute.item)}:
                </label>
                <progress
                  id={reviewersEvaluationText(distribute.item)}
                  max="100"
                  value={distribute.percent}
                >
                  {distribute.percent}%
                </progress>
              </div>
            ))}
          </p>
        </div>

        <div className={styles.title}>受講者コメント</div>

        <div>
          <div className={styles.content}>
            <div className={styles.subtitle}>良い点</div>
            {(props.courseReview.goodPoints || []).map(goodpoint => (
              <li key={goodpoint}>{goodpoint}</li>
            ))}
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>悪い点</div>
            {(props.courseReview.badPoints || []).map(badpoint => (
              <li key={badpoint}>{badpoint}</li>
            ))}
          </div>

          <div className={styles.content}>
            <div className={styles.subtitle}>その他</div>
            {(props.courseReview.otherComments || []).map(othercomment => (
              <li key={othercomment}>{othercomment}</li>
            ))}
          </div>
        </div>

        <div className={styles.title}>詳細情報</div>

        <div className={styles.content}>
          <div className={styles.subtitle}>わかりやすさ</div>
          {props.courseReview.understandability.distributes.map(distribute => (
            <div key={distribute.item}>
              <label htmlFor={understandabilityText(distribute.item)}>
                {understandabilityText(distribute.item)}:
              </label>
              <progress
                id={understandabilityText(distribute.item)}
                max="100"
                value={distribute.percent}
              >
                {understandabilityText(distribute.item)}
              </progress>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>評価項目</div>
          {(props.courseReview.assessmentMaterials || []).map(material => (
            <li key={material}>{material}</li>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>レポートの内容</div>
          <li>てきすとてきすとてきすと</li>
          <li>てきすとてきすとてきすと</li>
          <li>てきすとてきすとてきすと</li>
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>試験の難易度</div>
          {props.courseReview.examDifficulty.distributes.map(distribute => (
            <div key={distribute.item}>
              <label htmlFor={examDifficultyText(distribute.item)}>
                {examDifficultyText(distribute.item)}:
              </label>
              <progress
                id={examDifficultyText(distribute.item)}
                max="100"
                value={distribute.percent}
              ></progress>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.subtitle}>点数</div>
          {props.courseReview.grade.distributes.map(distribute => (
            <div key={distribute.item}>
              <label htmlFor={gradeText(distribute.item)}>{gradeText(distribute.item)}:</label>
              <progress id={gradeText(distribute.item)} max='100' value={distribute.percent}></progress>
            </div>
          ))}
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
