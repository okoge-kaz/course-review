import { useState, useMemo } from 'react'
import SubHeader from '../../../components/Lectures/SubHeader'
import Content from '../../../components/Lectures/LecturesListContent'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { DepartmentCoursesListWithLevel } from '../../../interfaces/courselist'
import { Segment, Department } from '../../../interfaces/segment'
import { CourseDetail } from '../../../interfaces/course'
import Head from 'next/head'
import LectureSearchBar from '../../../components/Search/LectureSearchBar'
import LecureCell from '../../../components/Search/DepartmentLecureCell'
import styles from '../../../styles/index.module.scss'
import Warning from '../../../components/Search/Warning'

interface StaticIndexProps {
  courseslists: DepartmentCoursesListWithLevel[]
  department: Department
}

const DepartmentCoursesList = (props: StaticIndexProps) => {
  const title = 'Titech Info: 逆評定'

  const [searchText, setSearchText] = useState('')
  // const [applyedGenres, setApplyedGenres] = useState<string[]>([])
  const [isFilled, setIsFilled] = useState(false)

  const keyInputEvent = (text: string) => {
    setSearchText(text)
  }

  const filteredLectures = useMemo(() => {
    if (searchText.length === 0) {
      return []
    }
    const splitSearchText = searchText.replace('　', ' ').split(' ')

    return props.courseslists.map(withLevelCourses => ({
      level: withLevelCourses.level,
      courses: withLevelCourses.courses.filter(course =>
        splitSearchText.every(
          text =>
            course.courseName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            course.teachers.some(teacher =>
              teacher.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
            ),
        ),
      ),
    }))
  }, [props.courseslists, searchText])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SubHeader key={props.department.id} name={props.department.name} />
      <div className="Container">
        <LectureSearchBar
          keyInputEvent={keyInputEvent}
          changeIsFilled={isFilled => setIsFilled(isFilled)}
        />
        {isFilled ? (
          searchText.length !== 0 ? (
            <>
              {filteredLectures.map(withLevellectures => (
                <Content
                  key={withLevellectures.level}
                  level={withLevellectures.level}
                  courses={withLevellectures.courses}
                />
              ))}
            </>
          ) : (
            <Warning></Warning>
          )
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
      </div>
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

  return {
    props: {
      courseslists,
      department,
    },
  }
}
