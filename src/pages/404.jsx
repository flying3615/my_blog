import React from 'react'
import Layout from '../container/Layout'
import { makeStyles } from '@material-ui/core/styles'

// https://codepen.io/salehriaz/pen/erJrZM

const useStyles = makeStyles(theme => ({
//   centralBody:{
//   padding: 17% 5% 10% 5%;
//   text-align: center;
}))

export default function NotFound () {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.centralBody}>
        <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
        <a href="http://salehriaz.com/404Page/404.html" class="btn-go-home" target="_blank">GO BACK HOME</a>
      </div>
      <div class="objects">
        <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
        <div class="earth-moon">
          <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
          <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
        </div>
        <div class="box_astronaut">
          <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
        </div>
      </div>
      <div class="glowing_stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>

      </div>

    </Layout>
  )
}
