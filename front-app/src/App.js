import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import CourseArea from './components/CourseArea/CourseArea'
import PdfViewer from './components/PdfViewer/PdfViewer';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { userActions } from './store/user-slice';
import { useDispatch } from 'react-redux';
import TestGive from './components/TestGive/TestGive';

function App() {

  const [videoDetails, changeVideoDetails] = useState([])
  const [pdfDetails, changePdfDetails] = useState([]);
  const [demoVidDetails, changeDemoVidDetails] = useState([])
  const [demoPdfDetails, changeDemoPdfDetails] = useState([]);
  const [state, changeState] = useState(0);
  const [loading, changeloading] = useState(false)
  const [data, changeData] = useState(false)
  const [cookies, setCookie] = useCookies(['name'])

  const dispatch = useDispatch()

  const userState = useSelector((state) => {
    return state.user
  })

  console.log(userState)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FETCH_LINK}/details`).then((response) => {
      return response.json()
    }).then((response) => {
      console.log(response)
      let video = []
      let pdf = [];
      let demoVid = [];
      let demoPdf = [];

      changeVideoDetails(response.video);
      videoDetails.map((single) => {
        const details = require(`./outerRes/${single.name}`);
        console.log(details)
        video.push(details)
      })
      changePdfDetails(response.pdf)
      pdfDetails.map((single) => {
        const details = require(`./outerRes/${single.name}`)
        console.log(details)
        pdf.push(details)
      })
      changeDemoVidDetails(response.demovid)
      demoVidDetails.map((single) => {
        const details = require(`./outerRes/${single.name}`);
        console.log(details);
        demoVid.push(details)
      })
      changeDemoPdfDetails(response.demopdf)
      demoPdfDetails.map((singleItem) => {
        const details = require(`./outerRes/${singleItem.name}`);
        console.log(details);
        demoPdf.push(details)
      })
      console.log(video, pdf)
      let dataTemp = { video: video, pdf: pdf, demoVid: demoVid, demoPdf: demoPdf };
      console.log(dataTemp);
      changeData(dataTemp)

      fetch(`${process.env.REACT_APP_FETCH_LINK}/userAuthenticated`, {
        headers: {
          jwt: cookies.jwt
        }
      }).then((response) => {
        return response.json();
      }).then((response) => {
        console.log(response)
        if (response.status) {
          dispatch(userActions.changeUser(false))
        } else {
          dispatch(userActions.changeUser(response))
        }
        // changeLoading(false);
        changeloading(true)
      })
    })
  }, [loading])

  console.log(data)

  return (
    <div className="App">
      <Switch>
        <Route path={'/'} exact>
          <Redirect to={'/home'}></Redirect>
        </Route>
        <Route path={'/home'} exact>
          <CourseArea data={data}></CourseArea>
        </Route>
        <Route path={'/pdf/:func/:id'}>
          <PdfViewer></PdfViewer>
        </Route>
        <Route path={'/test/:number'}>
          <TestGive></TestGive>
        </Route>
        <Route path={'/Login'}>
          <Login></Login>
        </Route>
        <Route path={'/SignUp'}>
          <SignUp></SignUp>
        </Route>
      </Switch>




    </div>
  );
}

export default App;
