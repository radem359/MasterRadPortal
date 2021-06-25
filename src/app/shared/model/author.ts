import { Book } from "./book";
import { Nationality } from "./nationality";

export class Author {

    id: number;
    authorName: string;
    books: Book[];
    nationality: Nationality;

}
