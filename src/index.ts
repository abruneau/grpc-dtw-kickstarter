import * as Condor from "condor-framework";

import { BookService } from "./book_service";

const logging = (ctx: any, next: any) => {
 console.info("Request:", ctx.req);
 return next();
};

const options = {
 listen: `0.0.0.0:${process.env.SERVER_PORT}`,
 rootProtoPath: "./protos",
};

const app = new Condor(options)
 .add("book_service.proto", "BookService", new BookService())
 .use(logging)
 .start();
