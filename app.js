const Joi = require("joi");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello Iam listning from practise 3 ");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  const user = courses.find((course) => course.id === parseInt(req.params.id));
  if (!user) res.status(404).send("Id did not match with given id");
  res.send(user);
  return;
});

app.post("/courses", (req, res) => {
 const { error } = validateCourse(req.body) 

     if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/courses/:id", (req, res) => {
   const course =  courses.find((c) => c.id === parseInt(req.params.id));
   if(!course)  res.status(404).send("Course id did not match given id try another id")
   
   
   const { error } = validateCourse(req.body) 
   if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name
  res.send(course)
 
});

app.delete('/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("Course id did not match given id try another id")

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
});




function validateCourse(course){
const schema ={
    name: Joi.string().min(3).required(),
  };
   return Joi.validate(course, schema);
}
app.listen(port, () => {
  console.log(`port listning ${port}...`);
});
