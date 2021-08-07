import { KeyboardEvent, useState } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import styles from './LectureSearchBar.module.scss'

type LectureSeachBarProps = {
  keyInputEvent: (text: string) => void
  changeIsFilled: (isFilled: boolean) => void
}

const LectureSearchBar = (props: LectureSeachBarProps) => {
  const keyupSearchTextkeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (composing) {
      return
    }

    props.keyInputEvent(e.currentTarget.value)
  }
  const setIsFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeIsFilled((e.target.value).length > 0)
  }

  const [composing, setComposing] = useState(false)
  // const [isFilled, setIsFilled] = useState(false)

  return (
    <div className={styles.main}>
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
      </div>
    </div>
  )
}

export default LectureSearchBar
