import React from 'react'
import "./Home.scss"
import Feed from '../../Components/Feed/Feed'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import Post from '../../Components/Post/Post'
const Home = () => {
 
  return (
    <>
    <div className="home">
      <div className="sec1">
        <Feed/>
        <RightSidebar/>
      </div>
 <div className="sec2">
 <Post/>
 </div>
  </div>
  </>
  )
}

export default Home