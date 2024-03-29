/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
  constructor(message, status) {
    message = message;
    status = status;
    console.error(stack);
  }
}


module.exports = ExpressError;