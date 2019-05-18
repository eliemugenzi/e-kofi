require("babel-register");
const path=require("path");
module.exports={
   "config":path.resolve(__dirname,"./server/config","index.js"),
   "models-path":path.resolve(__dirname,"./server/models/"),
   "seeders-path":path.resolve(__dirname,"./server/seeders/"),
   "migrations-path":path.resolve(__dirname,"./server/migrations/")

}