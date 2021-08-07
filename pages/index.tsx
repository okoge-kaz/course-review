import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'
import Search from '../components/Search/LectureSearch'
import { CourseDetail } from '../interfaces/course'
import LectureSearchBar from '../components/Search/LectureSearchBar'

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
      <Container className="mt-4">
        <Head>
          <title>Titech Info</title>
        </Head>
        {/* <Search {...props} /> */}
        <LectureSearchBar
          keyInputEvent={keyInputEvent}
          changeIsFilled={isFilled => setIsFilled(isFilled)}
        />
        {isFilled ? <div>filled</div> : <Content {...props} />}
      </Container>
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
