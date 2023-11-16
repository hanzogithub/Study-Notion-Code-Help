require("dotenv").config();

const dbConnect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const app = require("./app");

const PORT = process.env.PORT;

dbConnect();
cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT} successfully.`);
});
