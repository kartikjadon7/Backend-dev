const express =require("express");
const app=express();
const PORT=8000;

const students=[
    {id:1, name:"raj",branch:"cse"},
    {id:2, name:"Ajay",branch:"ECE"},
    {id:3, name:"Yash",branch:"IT"},
];

app.get("/",(req, res)=>{
    res.send("Welcome to home page");
});

app.get("/students",(req, res)=>{
    res.json(students);
});

app.get("/students/:id",(req, res)=>{
    const id=req.params.id;
    const arrayindex=students.findIndex(s=>s.id==id);
    const data=students[arrayIndex];
    res.json(data);
    // console.log(data)
    
})

app.get("/students",(req,res)=>{
    const branch=req.query.branch;
    const foundStudents= students.filter(s=>s.branch==branch);
    res.json(founddStudents);
})