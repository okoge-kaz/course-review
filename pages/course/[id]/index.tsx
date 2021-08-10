import React from 'react'
import SubHeader from '../../../components/Lectures/LectureDetail/SubHeader'
import Content from '../../../components/Lectures/LectureDetail/LectureDetailContent'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { CourseDetail } from '../../../interfaces/course'
import Head from 'next/head'

interface StaticIndexProps {
  course: CourseDetail
}

const CourseDetailContent = (props: StaticIndexProps) => {
  const title = 'Titech Info: 逆評定'

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <SubHeader
          key={props.course.id}
          id={props.course.id}
          name={props.course.courseName}
          teachers={props.course.teachers}
        />
        <div className="Container">
          <Content
            key={props.course.id}
            id={props.course.id}
            name={props.course.courseName}
            teachers={props.course.teachers}
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
  const res = await fetch(
    `https://titechinfo-data.s3-ap-northeast-1.amazonaws.com/course-review-tmp/search_keywords.json`,
  )
  const courseDetails: CourseDetail[] = await res.json()
  const course = courseDetails.find(couseDetail => couseDetail.id === params.id)
  return {
    props: {
      course,
    },
  }
}
