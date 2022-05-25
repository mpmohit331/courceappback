import { useParams } from "react-router"
import { useEffect, useState } from "react"
import SingleQues from "./SingletQues/SingleQues"
import classes from './TestGive.module.css'
import { Button } from "react-bootstrap"
import { PieChart } from 'react-minimal-pie-chart'

const TestGive = () => {

    const params = useParams()
    const [test, changeTest] = useState(false);
    const [marks, changeMarks] = useState([]);
    const [load, changeLoad] = useState(false)
    

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    console.log(marks)
    useEffect(() => {

        console.log(params)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/testInfo`, {
            headers: {
                number: params.number
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
            changeTest(response)
        })
    }, [])

    if(load)
    {   
        console.log(marks)
        console.log(test.ques)
        marks.map((singleItem)=>{
            if(test.ques[singleItem.number].options[parseInt(singleItem.option)].stat){
                correct = correct + 1
            }else{
                incorrect = incorrect + 1
            }
        })
        console.log(correct);
        console.log(incorrect)
        skipped = test.ques.length - marks.length 
    }

    return (
        <div>
            {test &&
            <>
                <div className={classes.parentDiv}>
                    <p className="mt-2">Test Chapter {test.number}</p>
                    {test.ques.map((singleItem, idx) => {
                        return (
                            <SingleQues idx={idx} load={load} marks={marks} changeMarks={changeMarks} singleItem={singleItem}></SingleQues>
                        )
                    })}
                    <Button onClick={() => { changeLoad(true) }} disabled={load} className={'mt-2'}>Submit Test</Button>
                </div>
            {load &&
                <div className={classes.marksDiv}>
                    <p>Final Result</p>
                    <div className={classes.attemptDiv}>
                        <div className={classes.pieChart}>
                        <PieChart
                            data={[
                                { title: 'One', value: incorrect, color: '#F46150' },
                                { title: 'Two', value: correct, color: '#7EE071' },
                                { title: 'Three', value: skipped, color: '#99B0BB' },
                            ]}
                        />
                        Correct: {correct}
                        Incorrect: {incorrect}
                        Skipped: {skipped}
                        </div>
                    </div>
                    <div className={classes.resultDiv}>
                    </div>
                </div>}
                </>
            }
        </div>
    )
}

export default TestGive