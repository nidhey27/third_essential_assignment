const express = require("express");
const app = express();
const _PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const logger = require('./test')
const mongoose = require('mongoose');
// logger.info('Hello again distributed logs');
dotenv.config();

app.use(morgan("combined", { stream: logger.stream }));

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/form", (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: "ThirdEssential Assignment API",
  });
});

// const db = require("./models");
// db.sequelize.sync({ force: false }).then(() => {
//   logger.info("Drop and re-sync db.");
// });

mongoose.connect(process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, },
  (err) => {
      if (!err) logger.info('MongoDB Connected')
      else console.log(err)
  })

require("./routes/users.routes")(app);

app.listen(_PORT, () => {
  logger.info(`App is UP and Running at PORT: ${_PORT}`);
});
