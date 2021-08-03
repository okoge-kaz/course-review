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
      
    </>
  )
}

export default LectureSearch

// // pagesのindexフィイルではなく、このファイルはあくまでもcomponentなので、以下のように書くのではなく別の手法でデータを関数に渡さないといけない
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(
//     `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
//   )
//   const courseDetails: CourseDetail[] = await res.json()
//   const courses = courseDetails
//   return {
//     props: {
//       courses,
//     },
//   }
// }
