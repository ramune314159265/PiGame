export default class KeyboardElement extends HTMLElement {
	#keyUpEventHandle
	#keyDownEventHandle
	constructor() {
		super()

		this.layout = 'calc'
		this.base = 10
		this.hiddenKeys = []
	}
	#set(sourceTemplate = KeyboardElement.layouts[this.layout][this.base]) {
		this.innerHTML = ''

		this.style.gridTemplateColumns = `repeat(${sourceTemplate.dataset.columns}, 1fr)`
		this.style.gridTemplateRows = `repeat(${sourceTemplate.dataset.rows}, 1fr)`
		this.appendChild(sourceTemplate.content.cloneNode(true))

		this.hiddenKeys.forEach(key => {
			this.getKeyElement(key).classList.add('hide')
		})

		this.childNodes.forEach(node => {
			if (!node.dataset?.key) {
				return
			}

			node.addEventListener('click', e => {
				this.dispatchEvent(new CustomEvent('keyboardPressed', {
					detail: {
						key: e.target.dataset.key,
						element: e.target
					}
				}))
			})
		})
	}
	connectedCallback() {
		this.#set()

		this.#keyDownEventHandle = e => {
			if (e.target.tagName === 'INPUT') {
				return
			}

			const keyElement = this.getKeyElement(e.key)
			if (!keyElement) {
				return
			}

			keyElement.classList.add('active')
		}
		this.#keyUpEventHandle = e => {
			if (e.target.tagName === 'INPUT') {
				return
			}

			const keyElement = this.getKeyElement(e.key)
			if (!keyElement) {
				return
			}

			keyElement.click()
			keyElement.classList.remove('active')
		}

		document.addEventListener('keydown', this.#keyDownEventHandle)
		document.addEventListener('keyup', this.#keyUpEventHandle)
	}
	disconnectedCallback() {
		document.removeEventListener('keydown', this.#keyDownEventHandle)
		document.removeEventListener('keyup', this.#keyUpEventHandle)
	}
	focus() {
		this.getKeyElements()[0].focus()
	}

	static layouts = {
		'calc': {
			2: document.querySelector('#base2Keyboard'),
			10: document.querySelector('#calcBase10Keyboard'),
			16: document.querySelector('#base16Keyboard'),
		},
		'phone': {
			2: document.querySelector('#base2Keyboard'),
			10: document.querySelector('#phoneBase10Keyboard'),
			16: document.querySelector('#base16Keyboard'),
		}
	}
	getKeyElements() {
		return this.querySelectorAll(`[data-key]`)
	}
	getKeyElement(number) {
		return this.querySelector(`[data-key="${number}"]`)
	}
	hideKeys(keyArray) {
		this.hiddenKeys = this.hiddenKeys.concat(keyArray)

		this.#set()
	}
	setKeyLayout(layout = this.layout, base = this.base){
		this.layout = layout
		this.base = base

		this.#set(KeyboardElement.layouts[layout][base])
	}
}
