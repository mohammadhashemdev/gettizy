import { createRouter } from "next-connect";
import bodyParser from "body-parser";

const bodyParserMiddleware = createRouter();

bodyParserMiddleware.use(bodyParser.json());
bodyParserMiddleware.use(bodyParser.urlencoded({ extended: true }));

export default bodyParserMiddleware;
