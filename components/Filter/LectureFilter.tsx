import { useState } from 'react'
import DepartmentCell from '../DepartmentCell'
import styles from './LectureFilter.module.scss'

type LectureDepartmentCategory = {
  department: string
  majors: string[]
}

type LectureFilterProps = {
  onApply: (selectedGenres: string[]) => void
  onReset: () => void
}

const filterGenreCategories: LectureDepartmentCategory[] = [
  {
    department: '教養科目',
    majors: [
      '文系教養科目',
      '英語科目',
      '第二外国語科目',
      '日本語・日本文化科目',
      '教職科目',
      '広域教養科目',
      '理工系教養科目',
    ],
  },
  {
    department: '理学院',
    majors: [`数学系`, `物理学系`, '化学系', '地球惑星科学系'],
  },
  {
    department: '工学院',
    majors: ['機械系', 'システム制御系', '電気電子系', '情報通信系', '経営工学系'],
  },
  {
    department: '物質理工学院',
    majors: ['材料系', '応用化学系'],
  },
  {
    department: '情報理工学院',
    majors: ['数理・計算科学系', '情報工学系'],
  },
  {
    department: '生命理工学院',
    majors: ['生命理工学系'],
  },
  {
    department: '環境社会理工学院',
    majors: ['建築系', '土木・環境工学系', '融合理工学系'],
  },
]

const LectureFilter = (props: LectureFilterProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const tapGenres = (genre: string) => {
    selectedGenres.includes(genre)
      ? setSelectedGenres(selectedGenres.filter(g => g !== genre))
      : setSelectedGenres([...selectedGenres, genre])
  }
  const lectureNumber: string[] = [`100番台`, `200番台`, `300番台`]

  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([])

  const tapDepartment = (deaprtment: string) => {
    selectedDepartment.includes(deaprtment)
      ? setSelectedDepartment(
          selectedDepartment.filter(selected_department => selected_department !== deaprtment),
        )
      : setSelectedDepartment([...selectedDepartment, deaprtment])
  }
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div key="講義番号">
          <p className={styles.section}>講義番号</p>
          <div className={styles.genreContainer}>
            {lectureNumber.map(genre => (
              <button
                className={`${styles.genre} ${selectedGenres.includes(genre) ? styles.active : ''}`}
                key={genre}
                onClick={() => tapGenres(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <div key="開講学院">
          <p className={styles.section}>開講学院</p>
          <div className={styles.genreContainer}>
            {filterGenreCategories.map(filterGenreCategory => (
              <div
                key={filterGenreCategory.department}
                className={` ${
                  selectedDepartment.includes(filterGenreCategory.department)
                    ? styles.department
                    : ''
                }`}
              >
                <button
                  className={`${styles.department_genre} 
                  ${
                    filterGenreCategory.majors.some(major => selectedGenres.includes(major)) &&
                    !selectedDepartment.includes(filterGenreCategory.department)
                      ? styles.selected_department
                      : ''
                  }
                  ${
                    selectedDepartment.includes(filterGenreCategory.department)
                      ? styles.department_active
                      : ''
                  } 
                  `}
                  onClick={() => tapDepartment(filterGenreCategory.department)}
                >
                  {filterGenreCategory.department}
                </button>
                {selectedDepartment.includes(filterGenreCategory.department) ? (
                  <span className={styles.right_side}>
                    <span
                      className={styles.dli_close}
                      onClick={() => tapDepartment(filterGenreCategory.department)}
                    ></span>
                  </span>
                ) : (
                  <></>
                )}
                {selectedDepartment.includes(filterGenreCategory.department) ? (
                  <div>
                    {filterGenreCategory.majors.map(major => (
                      <button
                        className={`${styles.genre} ${
                          selectedGenres.includes(major) ? styles.active : ''
                        }`}
                        key={major}
                        onClick={() => tapGenres(major)}
                      >
                        {major}
                      </button>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.reset}
          onClick={() => {
            setSelectedGenres([])
            setSelectedDepartment([])
            props.onReset()
          }}
        >
          条件をリセット
        </button>
        <button
          className={styles.apply}
          onClick={() => {
            props.onApply(selectedGenres)
          }}
        >
          検索
        </button>
      </div>
    </div>
  )
}

export default LectureFilter
