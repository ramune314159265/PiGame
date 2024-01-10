export default class OutputElement extends HTMLElement {
    constructor() {
        super()
    }
    #setElement(sourceTemplate) {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#output').content.cloneNode(true))
        this.output = this.querySelector('.output')
        this.complement = this.querySelector('.complement')
    }
    connectedCallback() {
        this.#setElement()
    }
    addToOutput(number) {
        this.output.textContent += number
        this.output.scrollIntoView(false)
    }
    backspaceOutput() {
        this.output.textContent = this.output.textContent.slice(0, -1)
        this.output.scrollIntoView(false)
    }
    setComplement(number = '') {
        this.complement.textContent = number
    }
}