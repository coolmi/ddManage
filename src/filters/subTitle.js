/**
 * Created by lzl on 17/3/27.
 */
module.exports = (str = '', len = 15) => {
  if (str.length > len) {
    return str.substr(0, len) + '...'
  }
  return str
};
