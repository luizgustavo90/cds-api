import mongoose from "mongoose";

mongoose.connect("mongodb://luizdsouza90:123@ac-u1juqbf-shard-00-00.wxkzy40.mongodb.net:27017,ac-u1juqbf-shard-00-01.wxkzy40.mongodb.net:27017,ac-u1juqbf-shard-00-02.wxkzy40.mongodb.net:27017/alura-node?ssl=true&replicaSet=atlas-waly6i-shard-0&authSource=admin&retryWrites=true&w=majority")
let db = mongoose.connection

export default db