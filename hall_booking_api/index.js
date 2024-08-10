import express from 'express';
import cors from 'cors';
import hallRouter from './Routers/hall_room.router.js'

const app = express();

const PORT=4000;
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("App is working correctly")
})

app.use('/api/hallRoom',hallRouter)

app.listen(PORT,()=>{
    console.log("App is listening in the port: ", PORT);
})