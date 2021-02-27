class ErrorMessage extends Error {
  constructor(message, status, field = 'server') {
    super(message);
    this.status = status;
    this.field = field;
  }
}

module.exports = ErrorMessage;
