import { Segment } from '../interfaces/segment'
import ContentsCell from './ContentsCell'
import React from 'react'

interface StaticIndexProps {
  segments: Segment[]
}

const SegmentIndex = (props: StaticIndexProps) => {
  return (
    <div>
      {(props.segments || []).map(segment => (
        <ContentsCell
          key={segment.school}
          school={segment.school}
          departments={segment.departments}
        />
      ))}
    </div>
  )
}

export default SegmentIndex
