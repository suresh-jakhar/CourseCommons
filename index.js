require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { userRoutes, courseRoutes, instructorRoutes } = require("./routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('App is running');
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/instructor", instructorRoutes);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

main();