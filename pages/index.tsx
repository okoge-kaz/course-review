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
import Warning from '../components/Search/Warning'
import LectureFilter from '../components/Filter/LectureFilter'

interface CourseDetailList {
  courseId: string
  courseDigit: number
  department: string
  url: string
  courseName: string
  teachers: string[]
}

interface StaticIndexProps {
  segments: Segment[]
  courses: CourseDetail[]
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

  const title = '逆評定 - Titech Info : 東工大情報サイト'

  const filteredLectures = useMemo(() => {
    if (searchText.length === 0) {
      return []
    }
    const splitSearchText = searchText.replace('　', ' ').split(' ')

    return props.courses
      .filter(course =>
        splitSearchText.every(searchword =>
          course.keywords.some(keyword =>
            keyword.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()),
          ),
        ),
      )
      .sort()
  }, [props.courses, searchText])

  const filteredLecturesWithGenre = useMemo(() => {
    const genresNumber: number[] = applyedGenres
      .filter(genre => genre.includes('番台'))
      .map(genre => Number(genre[0]))
    const genresDepartment: string[] = applyedGenres.filter(genre => !genre.includes('番台'))

    if (searchText.length === 0) {
      return props.genreCourses
        .filter(courseDetail => {
          genresNumber.some(genreNumber => courseDetail.courseDigit === genreNumber)
        })
        .filter(courseDetail => {
          genresDepartment.some(genreDepartment => courseDetail.department === genreDepartment)
        })
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
      .filter(courseDetail => {
        genresNumber.some(genreNumber => courseDetail.courseDigit === genreNumber)
      })
      .filter(courseDetail => {
        genresDepartment.some(genreDepartment => courseDetail.department === genreDepartment)
      })
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
        />
        {isOpenfilter ? (
          <LectureFilter
            onApply={genres => setApplyedGenres(genres)}
            onReset={() => setApplyedGenres([])}
          />
        ) : (
          <></>
        )}
        {applyedGenres.length === 0 ? (
          isFilled ? (
            searchText.length !== 0 ? (
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
              <Warning></Warning>
            )
          ) : (
            <Content {...props} />
          )
        ) : (
          <>
            {
              <div className={styles.Container}>
                <div>test </div>
                {/* <div>{props.genreCourses[0].department}</div>
                <div>{ (props.genreCourses[0].department === (applyedGenres.filter(genre => !genre.includes('番台')))[0]).toString() }</div>
                <div>{applyedGenres.map(genre => <div>{genre}</div>)}</div> */}
                <div>{filteredLecturesWithGenre.length}</div>
                <div>
                  {applyedGenres
                    .filter(genre => genre.includes('番台'))
                    .map(genre => Number(genre[0]))
                    .map(genre => (
                      <div>{genre}</div>
                    ))}
                </div>

                {filteredLecturesWithGenre.map(lecture => (
                  <LecureCell
                    key={lecture.courseId}
                    id={lecture.courseId}
                    name={lecture.courseName}
                    teachers={lecture.teachers}
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
  const response = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
  )
  const courses: CourseDetail[] = await response.json()

  const res2 = await fetch(
    'https://raw.githubusercontent.com/okoge-kaz/gyaku-hyoutei2020-json/master/course.json',
  )
  const genreCourses: CourseDetailList[] = await res2.json()

  return {
    props: {
      segments,
      courses,
      genreCourses,
    },
  }
}
