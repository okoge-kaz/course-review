import { GetStaticProps } from 'next'
import { CourseDetail } from '../../interfaces/course'
import { useState, useMemo } from 'react'
import LectureSearchBar from './LectureSearchBar'
// LectureFilterを書く

interface StaticIndexProps {
  courses: CourseDetail[]
}

const LectureSearch = (props: StaticIndexProps) => {
  const [searchText, setSearchText] = useState('')
  const [applyedGenres, setApplyedGenres] = useState<string[]>([])
  const [isFilled, setIsFilled] = useState(false)

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
        changeIsFilled={isFilled => setIsFilled(isFilled)}
      />
      {isFilled ? <div>filled</div> : <>not</>}
    </>
  )
}

export default LectureSearch
