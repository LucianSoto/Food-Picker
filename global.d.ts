declare global {
  interface ISearchOptions {
    distance: number,
    limit: number,
    price: any,
    term: string,
    openNow: boolean,
    categories: string,
    attributes: Array<string>,
  }
}

export {}