export enum NOTIFICATIONS {
  PRODUCT_CREATED = "Product was successfully created",
  PRODUCT_DELETED = "Product was successfully deleted",
  BAD_REQUEST = "Incorrect request body",
  UNAUTHORIZED = "Not authorized",
}

export const ERRORS = {
  PRODUCT_NOT_FOUND: (id: string) => `Product with id '${id}' wasn't found`,
  CONFLICT: (name: string) => `Product with name '${name}' already exists`,
};