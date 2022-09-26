import HomeStyles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={HomeStyles.homeContainer}>
        <div className={HomeStyles.homeHeader}>
          <div></div>
          <div className={HomeStyles.homePageTitle} >Avaliable Pages: </div>
          <div  className={HomeStyles.homeLoginRegisterText}>Login/Register </div>
        </div>
        <div className={HomeStyles.homeMiddleContainer}>
          <div className={HomeStyles.homeInnerContainer}>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

            <div className={HomeStyles.userPageContainer}>
              <div className={HomeStyles.userPageGreenBar}></div>
              <div className={HomeStyles.userPageTitle}>Vinicius</div>
              <div className={HomeStyles.userPageSubtitle}>@vinicius</div>
            </div>

          </div>
        </div>
    </div>
  )
}
