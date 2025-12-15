function checkBody(body, keys) {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(body, key) && body[key] !== '');
}

module.exports = { checkBody };
