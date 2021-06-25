import { Book } from "./book";

export class User {

    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    books: Book[];

}
