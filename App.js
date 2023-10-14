const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
/*app.get("/api/v1/tours",(req,res)=>{
    res.json({
        success: "200",
        data :{
            tours
        }
       
    })
 
})*/
app.use(express.json());
app.post("/api/v1/tours",(req,res)=>{
   console.log(req.body);
  // res.send(req.body);
    const newid = tours[tours.length-1].id+1;
     const newtour = Object.assign({id:newid},req.body);
    tours.push(newtour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err =>{
        res.json({
            status:"ok",
            message:{
                data: newtour
            }
        })
    })
   // const newtour = Object.assign({id:newid},req.body);
   // res.send("hiee");
});
app.get("/api/v1/tours/:id",(req,res)=>{
    console.log(req.params);
    const id = req.params.id *1;
    const tour = tours.find(el=> el.id===id);
    res.json({
        status: "sucess",
        data :{
            tour
        }
    })    }
)

/*app.post('/api/v1/tours',(req,res)=>{
  console.log(req.body);
  res.send("Done");
})*/
app.listen(port,()=>{
    console.log(`Port is listening ${port}`)
})