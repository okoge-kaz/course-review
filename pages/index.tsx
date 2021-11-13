import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'
import LectureSearchBar from '../components/Search/LectureSearchBar'
import LecureCell from '../components/Search/LecureCell'
import styles from '../styles/index.module.scss'
import LectureFilter from '../components/Filter/LectureFilter'

interface CourseDetailList {
  courseId: string
  courseDigit: number
  department: string
  url: string
  courseName: string
  teachers: string[]
  id: string
  isExist: boolean
}

interface StaticIndexProps {
  segments: Segment[]
  genreCourses: CourseDetailList[]
}

const index = (props: StaticIndexProps) => {
  const [searchText, setSearchText] = useState('')
  const [isFilled, setIsFilled] = useState(false)
  const [isOpenfilter, setIsOpenfilter] = useState(false)
  const [applyedGenres, setApplyedGenres] = useState<string[]>([])

  const keyInputEvent = (text: string) => {
    setSearchText(text)
  }

  const compareCourses = (a: CourseDetailList, b: CourseDetailList) => {
    if (a.courseId < b.courseId) {
      return -1
    } else if (a.courseId > b.courseId) {
      return 1
    } else return 0
  }


  const title = '逆評定 - Titech Info : 東工大情報サイト'

  const filteredLectures = useMemo(() => {
    if (searchText.length === 0) {
      return []
    }
    const splitSearchText = searchText.replace('　', ' ').split(' ')

    return props.genreCourses
      .filter(course =>
        splitSearchText.every(
          searchword =>
            course.courseName.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()) ||
            course.teachers.some(teacher =>
              teacher.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()),
            ),
        ),
      )
      .sort(compareCourses)
  }, [props.genreCourses, searchText])

  const filteredLecturesWithGenre = useMemo(() => {
    const genresNumber: number[] = applyedGenres
      .filter(genre => genre.includes('番台'))
      .map(genre => Number(genre[0]))
    const genresDepartments: string[] = applyedGenres.filter(genre => !genre.includes('番台'))

    const filtercheck = (
      value: string | number,
      genreDepartment: string[],
      genreNumber: number[],
    ) => {
      if (typeof value == 'string') {
        if (genreDepartment.length === 0) return true
        return genreDepartment.includes(value)
      } else {
        if (genreNumber.length === 0) return true
        return genreNumber.includes(value)
      }
    }

    if (searchText.length === 0) {
      if (genresNumber.length === 0) {
        return props.genreCourses
          .filter(courseDetail =>
            filtercheck(courseDetail.department, genresDepartments, genresNumber),
          )
          .sort(compareCourses)
      }
      if (genresDepartments.length === 0) {
        return props.genreCourses
          .filter(courseDetail =>
            filtercheck(courseDetail.courseDigit, genresDepartments, genresNumber),
          )
          .sort(compareCourses)
      }

      return props.genreCourses
        .filter(courseDetail =>
          filtercheck(courseDetail.courseDigit, genresDepartments, genresNumber),
        )
        .filter(courseDetail =>
          filtercheck(courseDetail.department, genresDepartments, genresNumber),
        )
        .sort(compareCourses)
    }

    const splitSearchText = searchText.replace('　', ' ').split(' ')

    return props.genreCourses
      .filter(courseDetail =>
        splitSearchText.every(
          text =>
            courseDetail.courseName.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            courseDetail.teachers.some(teacher =>
              teacher.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
            ),
        ),
      )
      .filter(courseDetail =>
        filtercheck(courseDetail.courseDigit, genresDepartments, genresNumber),
      )
      .filter(courseDetail => filtercheck(courseDetail.department, genresDepartments, genresNumber))
      .sort(compareCourses)
  }, [props.genreCourses, searchText, applyedGenres])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <SubHead />
      <div className="Container">
        <LectureSearchBar
          keyInputEvent={keyInputEvent}
          changeIsFilled={isFilled => setIsFilled(isFilled)}
          changeIsOpenFilter={isOpenFilter => setIsOpenfilter(isOpenFilter)}
          searchText={searchText}
          applyedGenres={applyedGenres}
        />
        {isOpenfilter ? (
          <LectureFilter
            onApply={genres => setApplyedGenres(genres)}
            onReset={() => setApplyedGenres([])}
            searchText={searchText}
            applyedGenres={applyedGenres}
          />
        ) : (
          <></>
        )}
        {applyedGenres.length <= 0 ? (
          searchText.length > 0 ? (
            <div className={styles.Container}>
              {filteredLectures.map(lecture => (
                <LecureCell
                  key={lecture.id}
                  id={lecture.id}
                  name={lecture.courseName}
                  teachers={lecture.teachers}
                  isExist={lecture.isExist}
                />
              ))}
            </div>
          ) : (
            <Content {...props} />
          )
        ) : (
          <>
            {
              <div className={styles.Container}>
                {filteredLecturesWithGenre.map(lecture => (
                  <LecureCell
                    key={lecture.id}
                    id={lecture.id}
                    name={lecture.courseName}
                    teachers={lecture.teachers}
                    isExist={lecture.isExist}
                  />
                ))}
              </div>
            }
          </>
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

  const res2 = await fetch(
    'https://raw.githubusercontent.com/okoge-kaz/TokyoTech-OCW-scraping/main/course_data.json',
  )
  const genreCourses: CourseDetailList[] = await res2.json()

  return {
    props: {
      segments,
      genreCourses,
    },
  }
}
