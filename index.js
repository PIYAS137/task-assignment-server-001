
const express = require("express");
const app = express();
const port = process.env.PORT || 5022;
const cors = require("cors");


//<<<<<---------------------------------------- middlewares ----------------------------------------->>>>>
app.use(express.json());
app.use(cors());
//<<<<<---------------------------------------- middlewares ----------------------------------------->>>>>


app.get('/',(req,res)=>{
    res.send("Server is RuNNinG......!!!");
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})