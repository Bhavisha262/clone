import React from 'react'
import "./Home.scss"
import Feed from '../../Components/Feed/Feed'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import Post from '../../Components/Post/Post'
const Home = () => {
 
  return (
    <>
    <div className="home">
    <Feed/>
    <Post/>
    <RightSidebar/>
  </div>
  </>
  )
}

export default Home