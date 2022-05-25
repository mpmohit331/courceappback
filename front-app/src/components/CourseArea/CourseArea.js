import classes from './CourseArea.module.css'
import Navbar from '../Navbar/Navbar';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useHistory } from 'react-router';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useSelector } from 'react-redux';
import LoggedCourseArea from '../LoggedCourseArea/LoggedCourseArea';



const CourseArea = ({ data }) => {

  console.log(data)

  const history = useHistory()

  // const useSelector = (state) => {
  //   return state.user
  // }

  const userState = useSelector((state) => {
    return state.user
  })

  console.log(userState)

  const pdfViewer = (id) => {
    history.push(`/pdf/demo/${id + 1}`)
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={classes.divOne}>


        {!userState.user &&
          <>

            {data &&
              <>
                
                  <>
                    {data.demoVid.map((singleItem, idx) => {
                      return (
                        <>
                          <video className={'mb-2'} style={{ maxWidth: '80%' }} controls src={singleItem}></video>
                          <button onClick={() => { pdfViewer(idx) }} className='mb-2'>{'View Notes'}</button>
                        </>
                      )
                    })}
                  </>
              </>}
          </>}

        {!userState.user.permission &&
          <>

            {data &&
              <>
                {data.demoVid.length === 3 && data.demoPdf.length === 3 &&
                  <>
                    {data.demoVid.map((singleItem, idx) => {
                      return (
                        <>
                          <video className={'mb-2'} style={{ maxWidth: '80%' }} controls src={singleItem}></video>
                          <button onClick={() => { pdfViewer(idx) }} className='mb-2'>{'View Notes'}</button>
                        </>
                      )
                    })}
                  </>}
              </>}
          </>

        }

        {userState.user.permission &&
          <>
            <LoggedCourseArea data={data}></LoggedCourseArea>

          </>}


        {/* {data && <>
          {data.demoVid.map((singleItem) => {
            return (
              <video className={'mb-2'} style={{ maxWidth: '80%' }} autoPlay controls src={singleItem}></video>
            )
          })}

        </>
        } */}
      </div>


      {/* {videoDetails.map((singleItem)=>{
        return (
          <>
            <video style={{maxWidth: '500px'}} autoPlay controls src={singleItem}></video>
          </>
        )
      })}
      {data.video &&
        <>
          {data.video.map((single) => {
            return (
              <video style={{ maxWidth: '500px' }} autoPlay controls src={single}></video>
            )
          })}
        </>} */}
    </>
  )
}

export default CourseArea