import router from 'next/router'
import { KeyboardEvent, useState } from 'react'
import styles from './LectureSearchBar.module.scss'

type LectureSeachBarProps = {
  keyInputEvent: (text: string) => void
  changeIsFilled: (isFilled: boolean) => void
  changeIsOpenFilter: (isOpen: boolean) => void
  searchText: string
  applyedGenres: string[]
}

const LectureSearchBar = (props: LectureSeachBarProps) => {
  const keyupSearchTextkeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (composing) {
      return
    }

    // const url = new URL(window.location.toString())
    // url.searchParams.set('searchText', e.currentTarget.value)
    // window.history.pushState({}, '', url.toString())

    props.keyInputEvent(e.currentTarget.value)
  }

  const setIsFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeIsFilled(e.target.value.length > 0)
  }

  const [composing, setComposing] = useState(false)
  const [isOpenfilter, setIsOpenfilter] = useState(false)

  return (
    <div className={styles.main}>
      <button
        className={styles.filterButton}
        onClick={() => {
          props.changeIsOpenFilter(!isOpenfilter)
          setIsOpenfilter(!isOpenfilter)
        }}
      >
        {isOpenfilter ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path
              id="Icon_material-close"
              data-name="Icon material-close"
              d="M23.5,9.111,21.889,7.5,15.5,13.889,9.111,7.5,7.5,9.111,13.889,15.5,7.5,21.889,9.111,23.5l4.041-4.041L15.5,17.111,21.889,23.5,23.5,21.889,17.111,15.5Z"
              transform="translate(-7.5 -7.5)"
              fill="#606266"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.286"
            height="16"
            viewBox="0 0 18.286 16"
          >
            <path
              id="Icon_awesome-sliders-h"
              data-name="Icon awesome-sliders-h"
              d="M17.714,14.821h-12V14.25a.573.573,0,0,0-.571-.571H4a.573.573,0,0,0-.571.571v.571H.571A.573.573,0,0,0,0,15.393v1.143a.573.573,0,0,0,.571.571H3.429v.571A.573.573,0,0,0,4,18.25H5.143a.573.573,0,0,0,.571-.571v-.571h12a.573.573,0,0,0,.571-.571V15.393A.573.573,0,0,0,17.714,14.821Zm0-5.714H14.857V8.536a.573.573,0,0,0-.571-.571H13.143a.573.573,0,0,0-.571.571v.571h-12A.573.573,0,0,0,0,9.679v1.143a.573.573,0,0,0,.571.571h12v.571a.573.573,0,0,0,.571.571h1.143a.573.573,0,0,0,.571-.571v-.571h2.857a.573.573,0,0,0,.571-.571V9.679A.573.573,0,0,0,17.714,9.107Zm0-5.714H10.286V2.821a.573.573,0,0,0-.571-.571H8.571A.573.573,0,0,0,8,2.821v.571H.571A.573.573,0,0,0,0,3.964V5.107a.573.573,0,0,0,.571.571H8V6.25a.573.573,0,0,0,.571.571H9.714a.573.573,0,0,0,.571-.571V5.679h7.429a.573.573,0,0,0,.571-.571V3.964A.573.573,0,0,0,17.714,3.393Z"
              transform="translate(0 -2.25)"
              fill="#606266"
            />
          </svg>
        )}
      </button>
      <div className={styles.textSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="19.997" height="20" viewBox="0 0 19.997 20">
          <path
            id="Icon_awesome-search"
            data-name="Icon awesome-search"
            d="M19.725,17.291,15.83,13.4a.937.937,0,0,0-.664-.273H14.53a8.12,8.12,0,1,0-1.406,1.406v.637a.937.937,0,0,0,.273.664l3.894,3.894a.934.934,0,0,0,1.324,0l1.105-1.105A.942.942,0,0,0,19.725,17.291Zm-11.6-4.168a5,5,0,1,1,5-5A5,5,0,0,1,8.124,13.124Z"
            fill="#606266"
          />
        </svg>

        <input
          className={styles.textSearchInput}
          onCompositionStart={() => {
            setComposing(true)
          }}
          onKeyUp={e => keyupSearchTextkeyPress(e)}
          onCompositionEnd={() => {
            setComposing(false)
          }}
          onChange={e => setIsFilled(e)}
          placeholder="Search"
        />
        <button
          className={styles.searchClick}
          onClick={e => {
            e.preventDefault()
            const PATH =
              `?searchText=` + props.searchText + 'searchGenre=' + props.applyedGenres.join(',')
            router.push(PATH)
          }}
        >
          検索
        </button>
      </div>
    </div>
  )
}

export default LectureSearchBar
