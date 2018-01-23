"use strict";
exports.__esModule = true;
var grpc = require("grpc");
var PROTO_PATH = __dirname + "/../protos/book_service.proto";
var library = grpc.load(PROTO_PATH).examplecom.library;
var client = new library.BookService("localhost:50051", grpc.credentials.createInsecure());
function getBook() {
    client.getBook({ isbn: 60929871 }, function (error, book) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(book);
        queryBooks();
    });
}
function queryBooks() {
    var authorPrefix = "Geor";
    var call = client.queryBooks(authorPrefix);
    call.on("data", function (book) {
        console.log(book);
    });
    call.on("end", function () { return; });
}
getBook();
