class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
  }
}

export default Canvas