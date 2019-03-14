const Common = (function() {
	"use strict";

	function _log_base(out_func, args) {
		const output = ["[Pong]:"];

		for (const arg of args)
			output.push(arg);

		out_func(output.join(" "));
	}

	function log(_var_args) {
		_log_base(console.log, arguments);
	}

	function log_error(_var_args) {
		_log_base(console.error, arguments);
	}

	class Vector2 {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		magnitude() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}
	}

	class Vector3 {
		constructor(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}

	class Vector4 {
		constructor(x, y, z, w) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}
	}

	class Color extends Vector4 {
		constructor(r, g, b, a = 1.0) {
			super(r, g, b, a);
		}

		get r() {
			return this.x;
		}
		get g() {
			return this.y;
		}
		get b() {
			return this.z;
		}
		get a() {
			return this.w;
		}
	}

	return {
		log: log,
		log_error: log_error,
		Vector2: Vector2,
		Vector3: Vector3,
		Vector4: Vector4,
		Color: Color
	};
})();