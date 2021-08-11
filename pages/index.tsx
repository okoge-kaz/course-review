import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'
import { CourseDetail } from '../interfaces/course'
import LectureSearchBar from '../components/Search/LectureSearchBar'
import LecureCell from '../components/Search/LecureCell'
import styles from '../styles/index.module.scss'

interface StaticIndexProps {
  segments: Segment[]
  courses: CourseDetail[]
}

const index = (props: StaticIndexProps) => {
  const [searchText, setSearchText] = useState('')
  const [applyedGenres, setApplyedGenres] = useState<string[]>([])
  const [isFilled, setIsFilled] = useState(false)

  const keyInputEvent = (text: string) => {
    setSearchText(text)
  }

  const title = '逆評定 - Titech Info : 東工大情報サイト'

  const filteredLectures = useMemo(
    () =>
      props.courses
        .filter(course =>
          course.courseName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
        )
        .filter(course => {
          if (applyedGenres.length === 0) {
            return true
          }
          const genres = course.keywords
          return genres.some(genre => applyedGenres.includes(genre))
        }),
    [props.courses, searchText, applyedGenres],
  )
  return (
    <div>
      <SubHead />
      <div className="Container">
        <Head>
          <title>{title}</title>
        </Head>
        <LectureSearchBar
          keyInputEvent={keyInputEvent}
          changeIsFilled={isFilled => setIsFilled(isFilled)}
        />
        {isFilled ? (
          <div className={styles.Container}>
            {filteredLectures.map(lecture => (
              <LecureCell
                key={lecture.id}
                id={lecture.id}
                name={lecture.courseName}
                teachers={lecture.teachers}
              />
            ))}
          </div>
        ) : (
          <Content {...props} />
        )}
      </div>
    </div>
  )
}

export default index

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/school_departments.json',
  )
  const segments: Segment[] = await res.json()
  const response = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
  )
  const courses: CourseDetail[] = await response.json()
  return {
    props: {
      segments,
      courses,
    },
  }
}
