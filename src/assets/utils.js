export default {
  addClass(el, name) {
    let className = el.className;
    let arr = className.split(" ");
    let newArr = arr.filter(value => {
      return value === name;
    });
    if (newArr.length !== 0) return;
    el.className += " " + name;
  },
  removeClass(el, name) {
    let className = el.className;
    let arr = className.split(" ");
    let filter = arr.filter(value => {
      return value !== name;
    });
    filter.join(" ");
    el.className = filter.join(" ");
  },
  hasClass(el, name) {
    let className = el.className;
    let arr = className.split(' ');
    let filter = arr.filter(value => {
      return value === name;
    })
    return filter.length === 0 ? false : true;
  }
}