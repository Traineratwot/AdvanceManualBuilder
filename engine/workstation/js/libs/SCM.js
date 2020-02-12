/*jshint esversion: 6 */
// [
// 	{item:'itemName',title:'title',function:function(){}}
// ]
class SCM {
	constructor(list = [], position = null) {
		var self = this;
		if (position) {
			this.position = position;
		}
		this.list = list;
		this.menu;
		this.ul;
		this.li = {};
		this.status = 0;
		if (this.list) {
			this.init();
		}
		this.events = {};
		$(document).on('mousemove touchmove', function (event) {
			self.Mouse(event);
		});
	}
	Mouse(e) {
		this.event = e;
		if (e.touches) {
			this.event.clientX = event.touches[0].clientX;
			this.event.clientY = event.touches[0].clientY;
		}
	}
	addItem(item = {}) {
		this.list.push(item);
		if (this.list) {
			this.init();
		}
		return this;
	}
	setList(list = []) {
		this.list = list;
		if (this.list) {
			this.init();
		}
		return this;
	}
	init() {
		var self = this;
		this.menu = $('<div class="SCM">');
		this.menu.css({
			display: 'none',
			position: 'absolute',
		})
		this.ul = $('<ul>').appendTo(this.menu);
		for (const key in this.list) {
			if (this.list.hasOwnProperty(key)) {
				const e = this.list[key];
				var li = $('<li class="SCM">');
				li.html(e.item);
				li.on('click touchend', function (params) {
					self.list[key].function(e, self, self.AnyValue);
					self.hide()
				});
				this.li[key] = li;
				li.appendTo(this.ul);
			}
		}
		$('body').append(this.menu);
		return this;
	}
	position(self, event, AnyValue) {
		this.menu.offset({
			top: this.event.pageY,
			left: this.event.pageX
		});
		return this;
	}
	show(event, AnyValue = {}) {
		if (this.status == 1) {
			if (AnyValue != this.AnyValue) {
				this.hide();
			} else {
				return;
			}
		}
		this.status = 1;
		var self = this;
		if (!this.menu) {
			console.warn('меню не обнаружено попробуйте добавить саписок либо вызвать функуцию init()');
			return true;
		}
		if (!$.isEmptyObject(event)) {
			this.event = event;
		}
		this.AnyValue = AnyValue;
		this.position(this, event, AnyValue);
		this.menu.fadeIn(this);
		// добовляем событие на скрытие меню при клике в другую область
		setTimeout(() => {
			$('body').on('click touchend', function (event) {
				self.events.body = event;
				self.hide();
			});
		}, 500);
		return this;
	}
	hide(event) {
		var self = this;
		if (this.status == 0) {
			return;
		}
		this.status = 0;
		if (!this.menu) {
			console.warn('меню не обнаружено попробуйте добавить саписок либо вызвать функуцию init()');
			return true;
		}
		$('body').unbind(self.events.body);
		this.menu.fadeOut();
		this.menu.offset({
			top: -9999,
			left: -9999
		});
		this.menu.fadeIn(0);
		return this;
	}
	remove() {
		for (const key in this.li) {
			if (this.li.hasOwnProperty(key)) {
				const e = this.li[key];
				e.unbind('click');
			}
		}
		this.menu.remove();
		this.menu = null;
		this.ul = null;
		this.li = null;
	}

}