import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import SubHead from '../components/SubHeader'
import Content from '../components/Content'
import { Segment } from '../interfaces/segment'

interface StaticIndexProps {
  segments: Segment[]
}
const index = (props: StaticIndexProps) => {
  return (
    <div>
      <SubHead />
      <Container className="mt-4">
        <Head>
          <title>Titech Info</title>
        </Head>
        <Content {...props}/>
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

  return {
    props: {
      segments,
    },
  }
}
