const express = require('express');
const app = express();
var fileupload = require('express-fileupload')
var cors = require('cors')
var getDb = require('./database').getDb;
var { mongoConnect } = require('./database')
const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb')


app.use(fileupload())

app.use(cors())
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get("/", (req, res, next) => {
    res.status(200).send("Hello World")
})

app.get('/details', (req, res, next) => {
    let db = getDb()
    db.collection('video').find({}).toArray().then((response) => {
        db.collection('pdf').find({}).toArray().then((response1) => {
            db.collection('demoVid').find({}).toArray().then((response3) => {
                db.collection('demoPdf').find({}).toArray().then((response4) => {
                    res.send({ video: response, pdf: response1, demovid: response3, demopdf: response4 })
                })

            })
        })
    })
})

app.use('/userAuthenticated', (req, res, next) => {
    // const cookie = req.cookies['jwt'];
    // const cookie2 = req.cookies;
    const cookie = req.headers.jwt;
    let db = getDb();
    if (cookie && cookie !== 'undefined') {
        const myId = new ObjectId(cookie);
        db.collection('user').findOne({ _id: myId }).then((response) => {
            if (response) {
                res.send(response);
            } else {
                res.send({ status: 'not logged in' })
            }
        })
    } else {
        res.send({ status: 'not logged in' })
    }
})

app.post("/upload", (req, res, next) => {
    const file = req.files.video;
    const { number } = req.headers
    let db = getDb();
    if (file.mimetype === 'video/mp4') {
        db.collection('video').find({ number: number }).toArray().then((response) => {
            if (response.length) {
                db.collection('video').updateOne({ number: number }, {
                    $set: {
                        name: file.name, func: "work", file: 'vid'
                    }
                }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            } else {
                db.collection('video').insertOne({ number: number, name: file.name, func: "work", file: 'vid' }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            }
        })
    } else if (file.mimetype === 'application/pdf') {

        db.collection('pdf').find({ number: number }).toArray().then((response) => {
            if (response.length) {
                db.collection('pdf').updateOne({ number: number }, {
                    $set: {
                        name: file.name, func: "work", file: 'pdf'
                    }
                }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            } else {
                db.collection('pdf').insertOne({ number: number, name: file.name, func: "work", file: 'pdf' }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            }
        })


    } else {
        res.send({ success: false, message: "File not PDF or Video" })
    }

})

app.use('/pdfname', (req, res, next) => {
    const { id, func } = req.headers;
    let db = getDb();
    if (func === 'demo') {
        db.collection('demoPdf').findOne({ number: id }).then((response) => {
            res.send(response)
        })
    } else {
        db.collection('pdf').findOne({ number: id }).then((response) => {
            res.send(response);
        })
    }
})

app.use('/uploadDemo', (req, res, next) => {
    const file = req.files.video;
    const { number } = req.headers;
    let db = getDb();
    if (file.mimetype === 'video/mp4') {
        db.collection('demoVid').find({ number: number }).toArray().then((response) => {
            if (response.length) {
                db.collection('demoVid').updateOne({ number: number }, {
                    $set: {
                        name: file.name, func: "demo", file: 'vid'
                    }
                }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            } else {
                db.collection('demoVid').insertOne({ number: number, name: file.name, func: "demo", file: 'vid' }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            }
        })
    } else if (file.mimetype === 'application/pdf') {
        db.collection('demoPdf').find({ number: number }).toArray().then((response) => {
            if (response.length) {
                db.collection('demoPdf').updateOne({ number: number }, {
                    $set: {
                        name: file.name, func: "demo", file: 'pdf'
                    }
                }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            } else {
                db.collection('demoPdf').insertOne({ number: number, name: file.name, func: "demo", file: 'pdf' }).then((response) => {
                    let uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    file.mv(uploadPath, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: "Done" })
                        }
                    })
                })
            }
        })
    } else {
        res.send({ status: false, message: "Not Done" })
    }
})


app.use('/currentLecPdf', (req, res, next) => {
    let db = getDb();
    let { user } = req.headers
    const date = new Date();
    const dateArray = date.toLocaleDateString().split("/")
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let timeLeft;
    let currentDate = new Date(`${dateArray[1]} ${dateArray[0]}, ${dateArray[2]} ${time}`)
    function diff_hours(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(diff);

    }
    db.collection('user').findOne({ _id: new ObjectId(user) }).then((response) => {
        console.log(response);
        let tempDate = new Date(`${response.date[1]} ${response.date[0]}, ${response.date[2]} ${response.time}`)
        timeLeft = diff_hours(currentDate, tempDate);
        console.log(timeLeft)
        if(timeLeft<24){
            res.send(['1'])
        }else{
            let hours = Math.round(timeLeft)
            let numberStart = hours / 24;
            let start = parseInt(numberStart).toString();
            let end = parseInt(numberStart + 1).toString();
            console.log(start,end)
            res.send([start, end])
        }
    })
})

app.use('/loginUser', (req, res, next) => {
    let db = getDb();
    const { email, password } = req.headers
    db.collection('user').findOne({ email: email, password: password }).then((response) => {
        res.send(response);
    })
})

app.use('/permissionUser', (req, res, next)=>{
    let db = getDb();
    console.log("permissionuser");
    let {id} = req.headers
    db.collection('user').updateOne({_id: new ObjectId(id)}, {
        $set: {
            permission: "granted"
        }
    }).then((response)=>{
        console.log(response);
        res.send(response)
    })
})


app.use('/displayUsers', (req, res, next)=>{
    let db = getDb();
    console.log("Display Users")
    db.collection('user').find({permission: {$exists: false}}).toArray().then((response)=>{
        console.log(response)
        res.send(response);
    })
})

app.use('/signUpUser', (req, res, next) => {
    let db = getDb();
    const date = new Date();
    const dateArray = date.toLocaleDateString().split("/")
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // let temp = dateArray[0];
    // dateArray[0] = dateArray[1];
    // dateArray[1] = temp;
    const { email, password, number, name } = req.headers;
    db.collection('user').findOne({ email: email }).then((response) => {
        if (response) {
            res.send({ msg: "Email Already Inserted", success: false })
        } else {
            db.collection('user').findOne({ number: number }).then((response) => {
                if (response) {
                    res.send({ msg: "Number Already Inserted", success: false });
                } else {
                    db.collection('user').insertOne({ number: number, email: email, password: password, name: name, date: dateArray, time: time }).then((response) => {
                        res.send({ success: true, msg: "Done" })
                    })
                }
            })
        }
    })
})

app.use('/submitTest', (req, res, next)=>{
    console.log("Submit Test");
    console.log(req.body);
    let db = getDb()
    const {ques, chapter} = req.body;
    // db.collection('tests').findOne
    db.collection('tests').findOne({number:chapter }).then((response)=>{
        if(response){
            db.collection('tests').updateOne({number: chapter}, {$set: {
                ques: ques
            }}).then((response)=>{
                console.log(response);
                res.send(response)
            })
        }else{
            db.collection('tests').insertOne({number: chapter, ques: ques}).then((response)=>{
                console.log(response);
                res.send(response)
            })
        }
    })
})

app.use('/testInfo', (req, res, next)=>{
    console.log("testinfo")
    let db = getDb()
    let {number} = req.headers
    console.log(number)
    db.collection('tests').findOne({number: parseInt(number)}).then((response)=>{
        console.log(response)
        res.send(response)
    })
})


mongoConnect(() => {
    app.listen(3002, () => {
        console.log("Started on port: 3002")
    })
})
