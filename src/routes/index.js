import { readdirSync } from "fs";
import { resolve } from "path";

export default (express) => {
  readdirSync(__dirname)
    .filter((file) => {
      /**
       * file: <name>.routes.js
       * - split(".") => ["<name>", "routes", "js"]
       * Casos:
       * 1º Contando los valores del arreglo sean igual a 3
       * 2ª El segundo valor del arreglo, tiene que ser igual a "routes"
       */
      let fileSplit = file.split(".");
      return fileSplit.length === 3 && fileSplit[1] === "routes";
    })
    .forEach((file) => {
      // express.use('/<contexto>', <object>)
      const context = file.split(".")[0];
      const route = require(resolve(__dirname, file));
      express.use(`/${context}`, route.default);
    });
};
