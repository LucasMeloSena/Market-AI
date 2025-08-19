export class GetCatalogError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, GetCatalogError.prototype);
  }
}
