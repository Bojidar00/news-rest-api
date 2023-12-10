import Koa from "koa";
import parser from "koa-bodyparser";
import newsRouter from "./routes/newsRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = new Koa();

app.use(parser());
app.use(newsRouter.routes());

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export { app };
