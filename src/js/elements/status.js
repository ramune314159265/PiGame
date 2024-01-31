export default class StatusElement extends HTMLElement {
    constructor() {
        super()
    }
    #set() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#statusBar').content.cloneNode(true))
        this.digitInputElement = this.querySelector('.nowDigit')
        this.maxDigitElement = this.querySelector('.maxDigit')
    }
    connectedCallback() {
        this.#set()
    }
}