const express = require("express");
const cors = require('cors');
const expressConfig = require("./configs/expressConfig");
const handleBarsConfig = require("./configs/handleBarsConfig");
const dbConnect = require("./configs/dbConfig");
const routes = require("./router");
const { PORT } = require("./constants");
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the actual origin of your React app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json())
expressConfig(app);
handleBarsConfig(app);

dbConnect()
  .then(() => console.log(`Succesfully connected to database`))

  .catch(() => console.log("Database not connected"));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
