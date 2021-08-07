import { useState, useMemo } from 'react'
import SubHeader from '../../../components/Lectures/SubHeader'
import { Container } from 'react-bootstrap'
import Content from '../../../components/Lectures/LecturesListContent'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { DepartmentCoursesListWithLevel, Course } from '../../../interfaces/courselist'
import { Segment, Department } from '../../../interfaces/segment'
import { CourseDetail } from '../../../interfaces/course'
import Head from 'next/head'
import Search from '../../../components/Search/LectureSearch'
import LectureSearchBar from '../../../components/Search/LectureSearchBar'

interface StaticIndexProps {
  courseslists: DepartmentCoursesListWithLevel[]
  department: Department
  courses: CourseDetail[]
}

const DepartmentCoursesList = (props: StaticIndexProps) => {
  const title = 'Titech Info: 逆評定'

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
      <Head>
        <title>{title}</title>
      </Head>
      <SubHeader key={props.department.id} name={props.department.name} />

      <Container className="mt-4">
        {/* <Search {...props} /> */}
        <LectureSearchBar
          keyInputEvent={keyInputEvent}
          changeIsFilled={isFilled => setIsFilled(isFilled)}
        />
        {isFilled ? (
          <div>filled</div>
        ) : (
          <>
            {(props.courseslists || []).map(courselist => (
              <Content
                key={courselist.level}
                level={courselist.level}
                courses={courselist.courses}
              />
            ))}
          </>
        )}
      </Container>
    </>
  )
}

export default DepartmentCoursesList

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/school_departments.json`,
  )

  const segments: Segment[] = await res.json()

  let departmentpaths: Department[] = new Array()
  segments.map(segment => segment.departments.map(department => departmentpaths.push(department)))

  return {
    paths: departmentpaths.map(departmentpath => `/department/${departmentpath.id}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  const params = context.params!
  const res = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/department/${params.id}.json`,
  )
  const courseslists: DepartmentCoursesListWithLevel[] = await res.json()

  const response = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/school_departments.json`,
  )
  const segments: Segment[] = await response.json()
  let departments: Department[] = new Array()
  segments.map(segment => segment.departments.map(department => departments.push(department)))

  const department = departments.find(department => department.id === parseInt(params.id))

  const data = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
  )
  const courses: CourseDetail[] = await data.json()

  return {
    props: {
      courseslists,
      department,
      courses,
    },
  }
}
