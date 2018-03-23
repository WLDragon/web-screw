/**
 * 处理浮点数精度问题
 * @param {Number} a 数1
 * @param {String} operator 操作符(+ - * /)
 * @param {Number} b 数2
 */
function fixPrecision(a, operator, b) {
    /**
     * 把数字拆分为整数和小数两部分
     * @param {Number} value 数字
     */
    function parseNumber(value) {
        var s = value.toString()
        var i = s.indexOf('.')
        if (i > -1) {
            var a = s.split('.')
            var sign = s.indexOf('-') == 0 ? '-' : ''
            return { integer: a[0], decimal: sign + a[1], length: a[1].length }
        } else {
            return { integer: value, decimal: 0, length: 0 }
        }
    }

    /**
     * 返回原数字的放大值
     * @param {Object} obj 拆分数字产生的对象
     * @param {Number} maxLength 小数的最大长度
     * @param {Number} times 放大倍数
     */
    function scale(obj, maxLength, times) {
        return obj.integer * times + obj.decimal * Math.pow(10, maxLength - obj.length)
    }

    var n1 = parseNumber(a)
    var n2 = parseNumber(b)

    var maxLength = Math.max(n1.length, n2.length)
    var times = 1
    if (maxLength > 0) {
        times = Math.pow(10, maxLength)
        a = scale(n1, maxLength, times)
        b = scale(n2, maxLength, times)
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