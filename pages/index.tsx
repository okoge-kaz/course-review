import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'
import Search from '../components/Search/LectureSearch'
import { CourseDetail } from '../interfaces/course'

interface StaticIndexProps {
  segments: Segment[]
  courses: CourseDetail[]
}

const index = (props: StaticIndexProps) => {
  return (
    <div>
      <SubHead />
      <Container className="mt-4">
        <Head>
          <title>Titech Info</title>
        </Head>
        <Search {...props} />
        <Content {...props} />
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
