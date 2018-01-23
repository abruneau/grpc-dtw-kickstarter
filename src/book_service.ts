export class Book {
 public isbn: number;
 public title: string;
 public author: string;
 constructor(object?: any) {
  this.isbn = Number(object.isbn);
  this.title = object.title;
  this.author = object.author;
 }
}

export class GetBookRequest {
 public isbn: number;
 constructor(object?: any) {
  this.isbn = Number(object.isbn);
 }
}

export class QueryBooksRequest {
 public author_prefix: string;
 constructor(object?: any) {
  this.author_prefix = object.author_prefix;
 }
}

const books: Book[] = [
 {
  isbn: 60929871,
  title: "Brave New World",
  author: "Aldous Huxley",
 },
 {
  isbn: 140009728,
  title: "Nineteen Eighty-Four",
  author: "George Orwell",
 },
 {
  isbn: 9780140301694,
  title: "Alice's Adventures in Wonderland",
  author: "Lewis Carroll",
 },
 {
  isbn: 140008381,
  title: "Animal Farm",
  author: "George Orwell",
 },
];

export class BookService {
 public getBook(ctx: any): Book {
  console.info("Calling method [GetBook]");
  const getBookRequest = new GetBookRequest(ctx.req);
  for (const i in books) {
   if (books[i].isbn === getBookRequest.isbn) {
    return books[i];
   }
  }
  throw new Error("Book not found");

 }

 public queryBooks(ctx: any) {
  console.info("Calling method [QueryBooks]");
  const queryBooksRequest = new QueryBooksRequest(ctx.req);
  books.forEach((book) => {
   if (book.author.search(queryBooksRequest.author_prefix) >= 0) {
    ctx.write(book);
   }
  });
  ctx.end();
 }
}
