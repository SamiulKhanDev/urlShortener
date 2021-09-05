const app = require("express")();
const morgan = require("morgan");
const port = process.env.PORT || 5000
const path = require("path");
const cors = require("cors");
const db = require('./database/database')
db()

const {nanoid}= require("nanoid");
const schema = require("./mod/schema");



app.use(cors());
app.use(require("express").json());
app.use(require("express").urlencoded({extended:true}));
app.use(morgan("tiny"));
app.use('/static', require("express").static("static"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"/views","index.html"))
})

app.get('/:id', async(req, res) => {
    const { id: alias } = req.params;
    const element = await schema.findOne({ "alias": alias });
    if (element) {
        res.redirect(element.url);
    } else {
        res.redirect(`/?error=${alias} not found/or maybe you have entered something which dose not exits`)
    }
})

app.post('/url', async(req, res) => {
    let { alias, url } = req.body;
    console.log(req.body);
    
    try {
        await schema.validate({
            alias,
            url
        });
        if (!alias) {
            alias = nanoid(10);
        }
            const isAlreadyPrasent = await schema.findOne({"alias":alias});
            if (isAlreadyPrasent) {
                res.sendFile(path.join(__dirname,"/views","alreadyexits.html"))
                return;
            } 
        
        alias = alias.toLowerCase();
        const newSchema =new schema({
            "alias": alias,
            "url":url,
        })
        const newObj = await newSchema.save();
        res.send(`<div>
    
        <p style="font-size:50px;"> <a href="https://urlshortenersamiul.herokuapp.com/${newObj.alias}">New Link OF The Site Is</a></p>
        <a style="font-size:20px;" href="/">go back</a>

       
        </div>`)
    } catch (error) {
        res.json({
        "message":error
      })
    }

})




app.listen(port, () => {
    console.log("server is up");
    
})