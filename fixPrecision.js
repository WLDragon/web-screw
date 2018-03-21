/**
 * 处理浮点数精度问题
 * @param {Number} a 数1
 * @param {Number} b 数2
 * @param {String} operator 操作符(+ - * /)
 */
function fixPrecision(a, b, operator) {
  /**
   * 获取小数长度
   * @param {*目标值} value 
   */
  function getDecimalLength(value) {
      var s = value.toString()
      var i = s.indexOf('.')
      return i > -1 ? s.length - i - 1 : 0
  }

  var n = Math.max(getDecimalLength(a), getDecimalLength(a))
  var times = 1
  if (n > 0) {
      times = Math.pow(10, n)
      a *= times
      b *= times
  }

  switch (operator) {
      case '+':
          return (a + b) / times
      case '-':
          return (a - b) / times
      case '*':
          return (a * b) / (times * times)
      case '/':
          return a / b
      default:
          throw new Error('no such operator "' + operator + '"')
  }
}