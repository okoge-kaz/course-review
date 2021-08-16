import { useState } from 'react'
import styles from './LectureFilter.module.scss'

type LectureGenreCategory = {
  name: string
  genres: string[]
}

type LectureFilterProps = {
  onApply: (selectedGenres: string[]) => void
  onReset: () => void
}

const filterGenreCategories: LectureGenreCategory[] = [
  {
    name: `講義番号`,
    genres: [
      `100番台`,
      `200番台`,
      `300番台`,
    ],
  },
  {
    name: '開講学院',
    genres: [
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
    selectedGenres.includes(genre) ? setSelectedGenres(selectedGenres.filter(g => g!==genre)) : setSelectedGenres([...selectedGenres, genre])
  }
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        {/* <p className={styles.title}>種類</p> */}
        {filterGenreCategories.map(filterGenreCategory => (
          <div key={filterGenreCategory.name}>
            <p className={styles.section}>{filterGenreCategory.name}</p>
            <div className={styles.genreContainer}>
              {filterGenreCategory.genres.map(genre => (
                <button
                  className={`${styles.genre} ${
                    selectedGenres.includes(genre) ? styles.active : ''
                  }`}
                  key={genre}
                  onClick={() => tapGenres(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          className={styles.reset}
          onClick={() => {
            setSelectedGenres([])
            props.onReset()
          }}
        >
          リセット
        </button>
        <button
          className={styles.apply}
          onClick={() => {
            props.onApply(selectedGenres)
          }}
        >
          適用
        </button>
      </div>
    </div>
  )
}

export default LectureFilter