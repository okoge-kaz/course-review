import { useState } from 'react'
import styles from './LectureFilter.module.scss'

type LectureGenreCategory = {
  name: string
  genre: string[]
}

type LectureFilterProps = {
  onApply: (selectedGenres: string[]) => void
  onRest: () => void
}

const filterGenreCategories: LectureGenreCategory[] = [
  {
    name: `講義番号`,
    genre: [
      `100番台`,
      `200番台`,
      `300番台`,
    ],
  },
  {
    name: '開講学院',
    genre: [
      `教養科目`,
      `初年次専門科目`,
      `理学院`,
      `工学院`,
      `物質理工学院`,
      `情報理工学院`,
      `生命理工学院`,
      `環境・社会理工学院`
    ],
  },
]

const LectureFilter = (props: LectureFilterProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const tapGenres = (genre: string) => {
    
  }
}

export default LectureFilter