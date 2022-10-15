import "dotenv/config";
import express from "./config/express";
import database from "./config/database";


(async () => {
  await express();
  await database()
})();
