import express from 'express'; 

const app = express(); 
const port = 4000; 
app.use(express.static('public')); 

app.get('/', (req, res, next) => {
    res.render('index.ejs'); 
}); 

app.get('/create-post', (req, res, next) => {
    consol
}); 

app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`); 
}); 