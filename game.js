class Game {
	constructor(
		canvas,
		{
			motion_blur = 0,
			background_color = new Common.Color(0, 0, 0, 1.0),
			objects = []
		} = {}
	) {
		this.background_color = background_color
		this.motion_blur = 1 - motion_blur
		this.objects = objects

		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		
		this._set_canvas_vars();
		canvas.addEventListener("resize", this._set_canvas_vars.bind(this));
		window.addEventListener("resize", this._set_canvas_vars.bind(this));
		
		this.mouse = new Common.Vector2(0, 0);
		document.addEventListener("mousemove", this._set_mouse_vars.bind(this));
	}

	start() {
		window.requestAnimationFrame(this.render.bind(this));
	}

	clear() {
		this.context.fillStyle =
			`rgba(${this.background_color.r}, ${this.background_color.g}, ${this.background_color.b}, ${this.motion_blur})`;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw() {
		for (const obj of this.objects)
			obj.draw();
	}

	render() {
		this.clear();
		this.draw();
		window.requestAnimationFrame(this.render.bind(this));
	}

	_set_canvas_vars() {
		this.half_width = this.canvas.width * 0.5;
		this.half_height = this.canvas.height * 0.5;
		this.bounds = this.canvas.getBoundingClientRect();
	}

	_set_mouse_vars(e) {
		this.mouse = this.screen2world(e.clientX, e.clientY);
	}

	draw_rect(position, w, h, color) {
		const c = this.world2canvas(position.x, position.y);

		w *= 0.5;
		h *= 0.5;
		c.x -= w * 0.5;
		c.y -= h * 0.5;

		this.context.fillStyle = color;
		this.context.fillRect(c.x, c.y, w, h);
	}

	canvas2world(x, y) {
		return new Common.Vector2(
			x - this.half_width,
			y - this.half_height
		);
	}

	world2canvas(x, y) {
		return new Common.Vector2(
			x + this.half_width,
			y + this.half_height
		);
	}

	canvas2screen(x, y) {
		return new Common.Vector2(
			x + this.bounds.left,
			y + this.bounds.top
		);
	}

	screen2canvas(x, y) {
		return new Common.Vector2(
			x - this.bounds.left,
			y - this.bounds.top
		);
	}

	world2screen(x, y) {
		const c = this.world2canvas(x, y);
		return this.canvas2screen(x, y);
	}

	screen2world(x, y) {
		const c = this.screen2canvas(x, y);
		return this.canvas2world(c.x, c.y);
	}

	viewport2canvas(x, y) {
		return new Common.Vector2(
			x * this.canvas.width,
			y * this.canvas.height
		);
	}

	canvas2viewport(x, y) {
		return new Common.Vector2(
			x / this.canvas.width,
			y / this.canvas.height
		);
	}

	viewport2world(x, y) {
		const c = this.viewport2canvas(x, y);
		return this.canvas2world(c.x, c.y);
	}

	world2viewport(x, y) {
		const c = this.world2canvas(x, y);
		return this.canvas2viewport(c.x, c.y);
	}

	viewport2screen(x, y) {
		const c = this.viewport2canvas(x, y);
		return this.canvas2screen(c.x, c.y);
	}

	screen2viewport(x, y) {
		const c = this.screen2canvas(x, y);
		return this.canvas2viewport(c.x, c.y);
	}
}