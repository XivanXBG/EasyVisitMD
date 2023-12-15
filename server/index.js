const express = require('express')
const expressConfig = require('./configs/expressConfig');
const handleBarsConfig = require('./configs/handleBarsConfig');
const dbConnect = require('./configs/dbConfig');
const {PORT} = require('./constants')




const app = express();

expressConfig(app);
handleBarsConfig(app);


dbConnect()
.then(()=>console.log(`Succesfully connected to database`))
    
.catch(()=>console.log('Database not connected'))


app.listen(PORT,()=>console.log(`Server is listening on port:${PORT}`))