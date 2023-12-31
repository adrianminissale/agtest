export namespace AppStateAction {
  export class Pagination {
    static readonly type = '[App] Pagination';
    constructor(public payload: number) {}
  }

  export class Posts {
    static readonly type = '[App] Posts';
    constructor(public payload: []) {}
  }

  export class UpdatedPosts {
    static readonly type = '[App] Updated Posts';
    constructor(public payload: {id: number}) {}
  }

  export class Links {
    static readonly type = '[App] Links';
    constructor(public payload: {}) {}
  }

  export class Search {
    static readonly type = '[App] Search';
    constructor(public payload: string) {}
  }
}