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
    genres: [`100番台`, `200番台`, `300番台`],
  },
  {
    name: '開講学院',
    genres: [
      `数学系`,
      `物理学系`,
      '化学系',
      '地球惑星科学系',
      '機械系',
      'システム制御系',
      '電気電子系',
      '情報通信系',
      '経営工学系',
      '材料系',
      '応用化学系',
      '数理・計算科学系',
      '情報工学系',
      '生命理工学系',
      '建築系',
      '土木・環境工学系',
      '融合理工学系',
      '文系教養科目',
      '英語科目',
      '第二外国語科目',
      '日本語・日本文化科目',
      '教職科目',
      '広域教養科目',
      '理工系教養科目',
    ],
  },
]

const LectureFilter = (props: LectureFilterProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const tapGenres = (genre: string) => {
    selectedGenres.includes(genre)
      ? setSelectedGenres(selectedGenres.filter(g => g !== genre))
      : setSelectedGenres([...selectedGenres, genre])
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
