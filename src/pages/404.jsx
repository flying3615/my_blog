import React, {Fragment} from 'react'
import NotFoundStyles from './404.module.css'
import four0four from './img/404.svg'
import rocket from './img/rocket.svg'
import earth from './img/earth.svg'
import moon from './img/moon.svg'
import astronaut from './img/astronaut.svg'

export default function NotFound () {

  return (

    <div className={NotFoundStyles.bgPurple}>
      <div className={NotFoundStyles.centralBody}>
        <img className={NotFoundStyles.image404} src={four0four} width="20%" />
        <a href="/" className={NotFoundStyles.btnGoHome}>GO BACK HOME</a>
      </div>
      <div className={NotFoundStyles.objects}>
        <img className={NotFoundStyles.objectRocket} src={rocket} width="2%" />
        <div className={NotFoundStyles.earthMoon}>
          <img className={NotFoundStyles.objectEarth} src={earth} width="8%" />
          <img className={NotFoundStyles.objectMoon} src={moon} width="5%" />
        </div>
        <div className={NotFoundStyles.boxAstronaut}>
          <img className={NotFoundStyles.objectAstronaut} src={astronaut} width="100%" />
        </div>
      </div>
      <div className={NotFoundStyles.glowingStars}>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>
        <div className={NotFoundStyles.star}/>

      </div>

    </div>

  )
}
