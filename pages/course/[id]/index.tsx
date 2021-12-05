import React from 'react'
import SubHeader from '../../../components/Lectures/LectureDetail/SubHeader'
import Content from '../../../components/Lectures/LectureDetail/LectureDetailContent'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { CourseDetail, CourseAssessment } from '../../../interfaces/course'
import Head from 'next/head'
import NoInformation from '../../../components/Lectures/LectureDetail/NoInformation'

interface StaticIndexProps {
  courseAssessment: CourseAssessment
}

const CourseDetailContent = (props: StaticIndexProps) => {
  let title = 'Titech Info: 逆評定'
  if (typeof props.courseAssessment === 'undefined') {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <NoInformation></NoInformation>
      </>
    )
  }
  title = props.courseAssessment.courseName + ' - Titech Info: 逆評定'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <SubHeader
          key={props.courseAssessment.courseId}
          id={props.courseAssessment.courseId}
          name={props.courseAssessment.courseName}
          teachers={props.courseAssessment.teachers}
        />
        <div className="Container">
          <Content
            key={props.courseAssessment.courseId}
            courseReview={props.courseAssessment}
          />
        </div>
      </div>
    </>
  )
}

export default CourseDetailContent

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
  )
  const courseDetails: CourseDetail[] = await res.json()
  return {
    paths: courseDetails.map(cousedetail => `/course/${cousedetail.id}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  const params = context.params!
  try {
    const res = await fetch(
      `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/course/${params.id}.json`,
    )
    const courseAssessment: CourseAssessment = await res.json()
    return {
      props: {
        courseAssessment,
      },
    }
  } catch (err) {
    return {
      props: {
        courseId: params.id,
        courseName: '情報なし科目',
      },
    }
  }
}
