import * as grpc from "grpc";
import { Book } from "./proto/book_service_pb";
const PROTO_PATH = __dirname + "/../protos/book_service.proto";

const library = grpc.load(PROTO_PATH).examplecom.library;
const client = new library.BookService("localhost:50051",
 grpc.credentials.createInsecure());

function getBook() {
 client.getBook({ isbn: 60929871 }, (error: Error, book: Book) => {
  if (error) {
   console.log(error);
   return;
  }
  console.log(book);
  queryBooks();
 });
}

function queryBooks() {
 const authorPrefix = "Geor";
 const call = client.queryBooks(authorPrefix);
 call.on("data", (book: Book) => {
  console.log(book);
 });
 call.on("end", () => { return; });
}

getBook();
