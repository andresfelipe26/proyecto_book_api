import {
  BodyResponseDeleteBook,
  BodyResponseGetById,
  BodyResponseGetAllBooks,
  BodyRequestCreateBook,
  BodyResponseCreateBook,
  BodyRequestUpdateBook,
  BodyResponseUpdateBook,
  BodyRequestCreateUser,
} from "../models/books.model";

export class BooksController {
  private domain: string;

  constructor(private urlApi: string) {
    this.domain = urlApi;
  }

  async createUser(user: BodyRequestCreateUser, token: string): Promise<void> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user),
    };
    const url = this.domain + "/api/v1/users";
    const result: Response = await fetch(url, reqOptions);

    console.log(`Status code: ${result.status}`);
    if (result.status !== 201) {
      console.log(`Response body: ${(await result.json()).message}`);
      throw new Error("Failed to create user");
    }
    console.log("User created successfully");
  }

  async postLogin(data: RequestLoginBooks): Promise<ResponseLoginBooks> {
    const endpointLogin: string = "/api/v1/auth/login";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = this.urlApi + endpointLogin;
    const result: Response = await fetch(url, reqOptions);

    console.log(`Status code: ${result.status}`);
    if (result.status !== 201) {
      console.log(`Response body: ${(await result.json()).message}`);
      throw new Error("Not authenticated: ");
    }
    const responseBodyLogin: ResponseLoginBooks = await result.json();
    return responseBodyLogin;
  }
  async allBooks(
    token: string,
    limit: number,
    page: number
  ): Promise<BodyResponseGetAllBooks> {
    const headers: Record<string, string> = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    const reqOptions: RequestInit = {
      method: "GET",
      headers: headers,
    };

    const response: Response = await fetch(
      `${this.domain}/api/v1/books?limit=${limit}&page=${page}`,
      reqOptions
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Error al obtener libros: ${response.status}: ${response.statusText}`
      );
    }
    const responseBodyGetAllBooks: BodyResponseGetAllBooks =
      await response.json();
    return responseBodyGetAllBooks;
  }

  async create(
    title: HTMLInputElement,
    author: HTMLInputElement,
    description: HTMLInputElement,
    summary: HTMLInputElement,
    publicationDate: HTMLInputElement,
    token: string
  ): Promise<BodyResponseCreateBook> {
    const newBook: BodyRequestCreateBook = {
      title: title.value,
      author: author.value,
      description: description.value,
      summary: summary.value,
      publicationDate: publicationDate.value,
    };

    const headers: Record<string, string> = {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newBook),
    };

    const response: Response = await fetch(
      `${this.domain}/api/v1/books`,
      reqOptions
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener libros: ${response.status}: ${response.statusText}`
      );
    }
    const responseBodyCreateBook: BodyResponseCreateBook =
      await response.json();
    return responseBodyCreateBook;
  }

  async getById(id: string, token: string): Promise<BodyResponseGetById> {
    const headers: Record<string, string> = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
    const reqOptions: RequestInit = {
      method: "GET",
      headers: headers,
    };
    const response: Response = await fetch(
      `${this.domain}/api/v1/books/${id}`,
      reqOptions
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener libros: ${response.status}: ${response.statusText}`
      );
    }
    const responseBodyGetById: BodyResponseGetById = await response.json();
    return responseBodyGetById;
  }

  async update(
    idCatche: string,
    title: HTMLInputElement,
    author: HTMLInputElement,
    description: HTMLInputElement,
    summary: HTMLInputElement,
    publicationDate: HTMLInputElement,
    token: string
  ): Promise<BodyResponseUpdateBook> {
    const updateBook: BodyRequestUpdateBook = {
      title: title.value,
      author: author.value,
      description: description.value,
      summary: summary.value,
      publicationDate: publicationDate.value,
    };

    const headers: Record<string, string> = {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const reqOptions: RequestInit = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(updateBook),
    };

    const response: Response = await fetch(
      `${this.domain}/api/v1/books/${idCatche}`,
      reqOptions
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener libros: ${response.status}: ${response.statusText}`
      );
    }
    const responseBodyUpdateBook: BodyResponseUpdateBook =
      await response.json();
    return responseBodyUpdateBook;
  }

  async delete(id: string, token: string): Promise<BodyResponseDeleteBook> {
    const headers: Record<string, string> = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    const reqOptions: RequestInit = {
      method: "DELETE",
      headers: headers,
    };

    const response: Response = await fetch(
      `${this.domain}/api/v1/books/${id}`,
      reqOptions
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener libros: ${response.status}: ${response.statusText}`
      );
    }
    const responseBodyDeleteBook: BodyResponseDeleteBook =
      await response.json();
    return responseBodyDeleteBook;
  }
}

