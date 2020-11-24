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
			// console.log('i add ' + id)
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
			// console.log('i not add ', options)
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
		// console.clear()
		for(const eventEntityListKey in EMC.eventEntityList) {
			const elem = EMC.eventEntityList[eventEntityListKey]

			// console.info(`elem.event.indexOf(event.type) `, elem.event.indexOf(event.type))
			// console.info(`(Object.is(elem.element, this) || Object.is(elem.element, event.target) `, (Object.is(elem.element, this) || Object.is(elem.element, event.target)))
			// console.warn(elem, event)
			if(elem.event.indexOf(event.type) >= 0 && (Object.is(elem.element, this) || Object.is(elem.element, event.target))) {
				if(typeof EMC[elem.func] == 'function') {
					EMC.defiedEvent[elem.id]
					Console.success(elem)
					return EMC[elem.func].call(event.target, event, elem)
				} else {
					// Console.error(`undefined function: "${EMC[elem.func]}"`)
				}
			}
		}
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
	data.object.set(data.name, $(this).val())
	$(this).removeClass('changing')
	$(this).addClass('changed')
}
EMC.selectChanged = function(event, data) {
	data.object.set(data.name, data.dataSetOriginal ? data.dataSetOriginal[$(this).val()] : data.dataSet[$(this).val()])
	$(this).removeClass('changing')
	$(this).addClass('changed')
}
EMC.createNewElement = function(event, data) {
	if(this instanceof CLASSES.ManualClass) {
		data.object.addElement(tmp[data.tempKey])
	} else {
		data.object.addChildren(tmp[data.tempKey], data.childKey)
	}
	layout.tree.render()
}
EMC.treeDblclick = function(event, data) {
	current.editor = $(this).data('object')
	layout.editor.render(GOA[current.editor])
}
EMC.treeNondblclick = function(event, data) {
	$(this).toggleClass('caret-down').find('+ .nested').slideToggle()
	GOA[$(this).data('object')].treeOpenedToggle()
}
EMC.treeAddDblclick = function(event, data) {
	if($(this).data('classkey') == 'ManualClass') {
		layout.editor.block.html('')
		var key = tmp.add(new CLASSES.ManualClass)
		tmp[key].editorRender({
			parent: layout.editor.block
		})
		$(editorTemplate.get('button', {
			id: key,
			classKey: 'ManualClass',
			btnClass: 'btn-success',
			text: 'save',
		})).appendTo(layout.editor.block).on('click', () => {
			manuals.add(tmp[key])
			layout.tree.render()
		})
		return false
	}
	var GlobalKey = $(this).data('object')
	var childKey = $(this).data('childKey')
	var modal = layout.editor.addModals[GlobalKey]
	modal.modal('show')
	modal.find('select').on('change', function() {
			modal.find('button.createElem i').html($(this).val())
		})
	modal.find('button.createElem').on('click', () => {
			var classKey = modal.find('select').val()
			var childKey = modal.find(`option[value="${classKey}"]`).data('key')
			GOA[GlobalKey].createNewElement(classKey, GlobalKey, childKey, layout.editor.block)
		})
}



