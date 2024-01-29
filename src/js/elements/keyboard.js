export default class KeyboardElement extends HTMLElement {
    #keyUpEventHandle
    #keyDownEventHandle
    constructor() {
        super()
    }
    static get observedAttributes() {
        return ['layout', 'base'];
    }
    #set(sourceTemplate) {
        this.innerHTML = ''

        this.appendChild(sourceTemplate.content.cloneNode(true))
    }
    connectedCallback() {
        this.#set(KeyboardElement.layouts[this.getAttribute('layout') ?? 'calc'][this.getAttribute('base') ?? 10])
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

        this.#keyDownEventHandle = e => {
            const keyElement = this.getKeyElement(e.key)
            if (!keyElement) {
                return
            }

            keyElement.classList.add('active')
        }
        this.#keyUpEventHandle = e => {
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
    attributeChangedCallback(attributeName, oldValue, newValue) {
        this.#set(KeyboardElement.layouts[this.getAttribute('layout') ?? 'calc'][this.getAttribute('base') ?? 10])
    }

    static layouts = {
        'calc': {
            10: document.querySelector('#calc10Keyboard')
        }
    }
    getKeyElements() {
        return this.querySelectorAll(`[data-key]`)
    }
    getKeyElement(number) {
        return this.querySelector(`[data-key="${number}"]`)
    }
    hideKeys(keyArray) {
        keyArray.forEach(key => {
            this.getKeyElement(key).classList.add('hide')
        })
    }
}