import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/time", (context) => {
  context.response.body = { serverTime: new Date().toISOString() };
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
console.log(`Server running at http://localhost:${port}`);
await app.listen({ port });
