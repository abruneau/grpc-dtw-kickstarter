import * as Promise from "bluebird";
import { expect } from "chai";
import * as Condor from "condor-framework";
import * as grpc from "grpc";
import "mocha";
import { Book, BookService } from "../src/book_service";

const PROTO_PATH = __dirname + "/../protos/book_service.proto";

describe("BookService", () => {
 let condor;
 let client;

 before(() => {
  initializeCondorServer();
  initializeCondorClient();
 });

 function initializeCondorServer() {
  condor = new Condor()
   .add(PROTO_PATH, "BookService", new BookService())
   .start();
 }

 function initializeCondorClient() {
  const library = grpc.load(PROTO_PATH).examplecom.library;
  client = new library.BookService("127.0.0.1:50051",
   grpc.credentials.createInsecure());
 }

 after(() => {
  condor.stop();
 });

 describe("GetBook", () => {
  let clientGetBook;

  before(() => {
   clientGetBook = Promise.promisify(client.getBook, { context: client });
  });

  it("should retrun a Book", () => {
   return clientGetBook({ isbn: 60929871 })
    .then((book) => {
     expect(book).to.have.property("isbn").that.is.a("string");
     expect(book).to.have.property("title").that.is.a("string");
     expect(book).to.have.property("author").that.is.a("string");
    });
  });
 });

 describe("QueryBooks", () => {

  it("should return a list of books", (done) => {
   const authorPrefix = "Geor";
   const call = client.queryBooks(authorPrefix);
   call.on("data", (book: Book) => {
    expect(book).to.have.property("isbn").that.is.a("string");
    expect(book).to.have.property("title").that.is.a("string");
    expect(book).to.have.property("author").that.is.a("string");
   });
   call.on("end", () => { done(); });
  });
 });
});
