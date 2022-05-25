import classes from './SingleQues.module.css'

const SingleQues = ({ singleItem, idx, load, marks, changeMarks }) => {

    console.log(load)

    const handleCapture = (e) => {
        let prevMarks = marks;
        let obj = {}
        let flag = false;
        obj.number = idx;
        obj.option = e.target.id;
        prevMarks.map((singleItem) => {
            if (singleItem.number === idx) {
                flag = true
            }
        })
        if (!flag) {
            prevMarks.push(obj);
            changeMarks(prevMarks)
            console.log(prevMarks)
        }

    }
    let trueAnswer;

    return (

        <div className={classes.parentDiv}>
            <p>{singleItem.ques}</p>
            {singleItem.options.map((singleItem, ind) => {

                if (singleItem.stat) {
                    trueAnswer = singleItem
                }

                return (
                    <div className={classes.optionDiv}>
                        <input disabled={load} onClick={handleCapture} id={ind} type={'radio'} name={idx.toString()} value={singleItem.option}></input>
                        <label>{singleItem.option}</label>
                    </div>
                )
            })}

            {load &&
                <>
                    <hr></hr>
                    <p>The Correct Answer is {trueAnswer.option}</p>
                </>}
        </div>
    )
}

export default SingleQues