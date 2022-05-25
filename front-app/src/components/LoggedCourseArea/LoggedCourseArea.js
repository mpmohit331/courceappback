import classes from './LoggedCourseArea.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const LoggedCourseArea = ({ data }) => {

    const [index, changeIndex] = useState(false)

    const state = useSelector((state) => {
        return state.user
    })
    const history = useHistory();
    const pdfViewer = (id) => {
        history.push(`/pdf/course/${id + 1}`)
    }

    const testHandler = (idx) => {
        history.push(`/test/${idx + 1}`);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/currentLecPdf`, {
            headers: {
                user: state.user._id
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            changeIndex(response)
        })
    }, [])

    return (
        <div>

            
            {index &&
                <>
                    {data &&
                        <div className={classes.parentDiv}>
                            {data.video.map((singleItem, idx) => {
                                let num = idx + 1
                                if (index.includes(num.toString())) {
                                    return (
                                        <div className={classes.contentDiv}>
                                            <video className='mb-2' style={{ maxWidth: '80%' }} controls src={singleItem}></video>
                                            <div className={classes.btnArea
                                            }>
                                            <button onClick={() => { pdfViewer(idx) }}>{'View Notes'}</button>
                                            <button onClick={()=>{testHandler(idx)}}>{"Test You!"}</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>}
                </>}

        </div>
    )
}

export default LoggedCourseArea