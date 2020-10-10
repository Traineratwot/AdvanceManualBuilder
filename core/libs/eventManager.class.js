class EventManagerClass {
	eventList = []
	eventEntityList = {}
	defiedEvent = {}


	constructor() {

		this.init()
	}


	add(options) {
		this.eventList.push(options.event)
		if(uniqueArrayObject(this.eventEntityList, ['element', 'event', 'func'], options)) {
			var id = getRandomString()
			console.log('i add ' + id)
			options = Object.assign(
				{
					id: id,
					element: document,
					event: 'click',
					func: 'todo'
				}
				, options)
			this.eventEntityList[id] = options
			return id
		} else {
			console.log('i not add ', options)
		}
		return false
	}


	init() {
		var self = this
		$(`*[data-event]`).each(function() {
			self.add({
				element: this,
				event: $(this).data('event'),
				func: $(this).data('event-func'),
			})
		})
	}


	setEvents() {
		this.eventList = getUniqueValues.call(this.eventList)
		for(const eventListKey in this.eventList) {
			$(document).off(this.eventList[eventListKey], EMC.manager)
			$(document).on(this.eventList[eventListKey], EMC.manager)
		}
	}


	closeEvents() {

	}


	todo() {
		console.debug('TODO EventManagerClass')
	}


	manager(event) {
		console.clear()
		for(const eventEntityListKey in EMC.eventEntityList) {
			const elem = EMC.eventEntityList[eventEntityListKey]

			console.info(`elem.event.indexOf(event.type) `, elem.event.indexOf(event.type))
			console.info(`(Object.is(elem.element, this) || Object.is(elem.element, event.target) `, (Object.is(elem.element, this) || Object.is(elem.element, event.target)))
			console.warn(elem, event)
			if(elem.event.indexOf(event.type) >= 0 && (Object.is(elem.element, this) || Object.is(elem.element, event.target))) {
				if(typeof EMC[elem.func] == 'function') {
					event.preventDefault()
					EMC.defiedEvent[elem.id]
					Console.success(elem)
					return EMC[elem.func].call(event.target, event, elem)
				} else {
					console.error(`undefined function: "${EMC[elem.func]}"`)
				}
			}
		}
		console.error(`undefined`, event)
	}

}

var EMC = new EventManagerClass()
EMC.editorRender_button = function() {
	layout.editor.modals[$(this).data('object')].modal('show')
}
EMC.editorRender_button_action_save = function(event, data) {
	var options = data.options
	if(options.object !== false) {
		options.object.addChildren(data.elem, options.fieldKey)
		if(options.caller != 'create') {
			layout.editor.render(GOA[options.object.GlobalKey])
			layout.tree.render()
		}
	}
}
EMC.editorRender_button_action_cancel = function(event, data) {
	tmp.remove(data)
}
EMC.inputChanging = function(event, data) {
	$(this).addClass('changing')
	$(this).removeClass('changed')
}
EMC.inputChanged = function(event, data) {
	data.object.set(this.name, $(this).val())
	$(this).removeClass('changing')
	$(this).addClass('changed')
}
