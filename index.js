const app = require("express")();
const morgan = require("morgan");
const port = process.env.PORT || 5000
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(require("express").json());
app.use(morgan("tiny"));
app.use('/static', require("express").static("static"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"/views","index.html"))
})
app.get('/url/:id', (req, res) => {
    res.json({
        message:req.params
    })
})

app.get('/:id', (req, res) => {
    res.json({
        message:req.params
    })
})

app.post('/url', (req, res) => {
    res.json({
        message:"url"
    })
})




app.listen(port, () => {
    console.log("server is up");
    
})