export class CustomeError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const createCustomError = (status, message) => {
  return new CustomeError(status, message);
};
