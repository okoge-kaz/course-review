import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'
import { CourseDetail } from '../interfaces/course'
import { Course, DepartmentCoursesListWithLevel } from '../interfaces/courselist'
import LectureSearchBar from '../components/Search/LectureSearchBar'
import LecureCell from '../components/Search/LecureCell'
import styles from '../styles/index.module.scss'
import Warning from '../components/Search/Warning'
import LectureFilter from '../components/Filter/LectureFilter'

interface StaticIndexProps {
  segments: Segment[]
  courses: CourseDetail[]
}

const departmentNameToNumber = (departmentName: string) => {
  switch (departmentName) {
    case '数学系':
      return 1
    case `物理学系`:
      return 2
    case '化学系':
      return 3
    case '地球惑星科学系':
      return 4
    case '機械系':
      return 6
    case 'システム制御系':
      return 7
    case '電気電子系':
      return 8
    case '情報通信系':
      return 9
    case '経営工学系':
      return 10
    case '材料系':
      return 11
    case '応用化学系':
      return 12
    case '数理計算科学系':
      return 13
    case '情報工学系':
      return 14
    case '生命理工学系':
      return 15
    case '建築系':
      return 16
    case '土木・環境工学系':
      return 17
    case '融合理工学系':
      return 18
    case '文系教養科目':
      return 19
    case '英語科目':
      return 20
    default: {
      return 5
    }
  }
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

  const [courses, setCourses] = useState<Course[]>([])
  // let courses: Course[] = new Array()

  const featchDepartmentData = async (indexes: number[], levels: number[]) => {
    for (const index in indexes) {
      const url = `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/department/${index}.json`
      const res2 = await fetch(url)
      const unFilteredCourses: DepartmentCoursesListWithLevel[] = await res2.json()
      unFilteredCourses.map(withLevelUnFilteredCourses => {
        if (levels.includes(withLevelUnFilteredCourses.level)) {
          withLevelUnFilteredCourses.courses.map(course => courses.push(course))
        }
      })
    }
    setCourses(courses)
  }

  const filteredLectures =
    (applyedGenres.length === 0 || applyedGenres.length === undefined)
      ? useMemo(() => {
          if (searchText.length === 0) {
            return []
          }
          const splitSearchText = searchText.replace('　', ' ').split(' ')

          return props.courses.filter(course =>
            splitSearchText.every(searchword =>
              course.keywords.some(keyword =>
                keyword.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()),
              ),
            ),
          )
        }, [props.courses, searchText])
      : useMemo(() => {
          let levels: number[] = new Array()
          let departmentsNumbers: number[] = new Array()
          applyedGenres.forEach(genre => {
            if (genre.includes('番台')) {
              if (genre === '100番台') {
                levels.push(1)
              } else if (genre === '200番台') {
                levels.push(2)
              } else if (genre === '300番台') {
                levels.push(3)
              } else {
                // const no: never = genre
              }
            } else {
              departmentsNumbers.push(departmentNameToNumber(genre))
            }
          })
          if(levels.length===0){
            levels = [1,2,3]
          }
          if (departmentsNumbers.length === 0) {
            let ids: number[] = new Array()
            for (let i: number = 1; i <= 25; i++) {
              ids.push(i)
            }
            featchDepartmentData(ids,levels)
          } else {
            featchDepartmentData(departmentsNumbers, levels)
          }

          if (searchText.length === 0) {
            return courses
          }
          const splitSearchText = searchText.replace('　', ' ').split(' ')

          return courses.filter(course =>
            splitSearchText.every(
              searchword =>
                course.courseName.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()) ||
                course.teachers.some(teacher =>
                  teacher.toLocaleLowerCase().includes(searchword.toLocaleLowerCase()),
                ),
            ),
          )
        }, [courses, searchText])

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
        {isFilled ? (
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
