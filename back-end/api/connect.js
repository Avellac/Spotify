import { MongoClient } from "mongodb";

const URI = "mongodb+srv://Avellac:8RsV36B4sy7TRhiL@dbtonodes.sduo4.mongodb.net/?retryWrites=true&w=majority&appName=DBtoNodes";

const client = new MongoClient(URI);
export const db = client.db("spotify");
