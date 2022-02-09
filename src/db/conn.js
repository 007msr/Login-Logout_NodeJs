const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/UserRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((e) => console.log("err" + e));
