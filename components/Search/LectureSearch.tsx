import { GetStaticProps } from 'next'
import { CourseDetail } from '../../interfaces/course'
import { useState, useMemo } from 'react'
import LectureSearchBar from './LectureSearchBar'
import styles from './LectureSearch.module.scss'
// LectureFilterを書く

interface StaticIndexProps {
  courses: CourseDetail[]
}

const LectureSearch = (props: StaticIndexProps) => {
  const [searchText, setSearchText] = useState('')
  const [applyedGenres, setApplyedGenres] = useState<string[]>([])
  const [isOpenfilter, setIsOpenfilter] = useState(false)

  const keyInputEvent = (text: string) => {
    setSearchText(text)
  }

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
    <>
      <LectureSearchBar
        keyInputEvent={keyInputEvent}
        changeIsOpenFilter={isOpenFilter => setIsOpenfilter(isOpenFilter)}
      />
      {/* {isOpenfilter ? (
        <LectureFilter
          onApply={genres => setApplyedGenres(genres)}
          onReset={() => setApplyedGenres([])}
        />
      ) : (
        <></>
      )}
      <div className={styles.main}>
        {filteredLectures.map(course => (
          <LectureCell
            key={course.id}
            id={course.id}
            name={course.courseName}
            keywords={course.keywords}
            teachers={course.teachers}
          />
        ))}
      </div> */}
    </>
  )
}

export default LectureSearch
