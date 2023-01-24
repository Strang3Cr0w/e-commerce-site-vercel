const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res, next) =>{
    res.render("index");
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});