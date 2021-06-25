import { Author } from "./author";
import { Genre } from "./genre";
import { Language } from "./language";
import { User } from "./user";

export class Book {
    id: number;
    bookName: string;
    isbnNumber: string;
    bookDescription: string;
    authors: Author[];
    language:Language;
    genres: Genre[];
    user: User;

}
