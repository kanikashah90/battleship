function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
  return 'row ' + this.y + ' column ' + this.x;
};

module.exports = Point;