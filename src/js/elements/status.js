export default class StatusElement extends HTMLElement {
    constructor() {
        super()
    }
    #set() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#statusBar').content.cloneNode(true))
        this.digitInputElement = this.querySelector('.nowDigit')
        this.digitLengthElement = this.querySelector('.digitLength')
    }
    connectedCallback() {
        this.#set()
    }
    setDigitLength(length){

    }
}