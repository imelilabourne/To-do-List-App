require('dotenv').config();

const express = require("express");
const app = express();
//Middleware
app.use(express.json());

app.use("/tasks", require("./routes/todoRoutes"));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
  
    res.status(500).json({
      message: "Something went wrong",
    });
});
  
// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));