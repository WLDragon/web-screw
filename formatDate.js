/**
 * 格式化日期 new Date().format('YYYY-MM-dd') //2018-05-11
 * @param {String} format 
 */
Date.prototype.format = function(format) {
  let m = {
    'y+': this.getFullYear(),// year
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
  }
  for(let k in m) {
    if(new RegExp(`(${k})`).test(format)) {
      let x = RegExp.$1
      let y = m[k] + ''
      let z = x.length > y.length
        ? y.padStart(x.length, '0')
        : y.substr(y.length - x.length)
      format = format.replace(x, z)
    }
  }
  return format
}