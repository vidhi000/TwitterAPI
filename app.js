import Koa from "koa";
import koaBodyparser from "koa-bodyparser";
import dotenv from "dotenv";
import {router} from "./routes/twitterRoute.js";

const app = new Koa();

dotenv.config();
const PORT = process.env.PORT

// app.use(koaBodyparser());

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});

export {app}

