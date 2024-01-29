export default class OutputElement extends HTMLElement {
    constructor() {
        super()
    }
    #set() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#output').content.cloneNode(true))
        this.prefixElement = this.querySelector('.prefix')
        this.outputElement = this.querySelector('.output')
        this.complementElement = this.querySelector('.complement')
    }
    connectedCallback() {
        this.#set()
    }
    addToOutput(number) {
        this.outputElement.textContent += number
        this.outputElement.scrollIntoView(false)
    }
    setOutput(number) {
        this.outputElement.textContent = number
        this.outputElement.scrollIntoView(false)
    }
    backspace() {
        this.outputElement.textContent = this.outputElement.textContent.slice(0, -1)
        this.outputElement.scrollIntoView(false)
    }
    setComplement(number = '') {
        this.complementElement.textContent = number
    }
    setPrefix(content = '') {
        this.prefixElement.textContent = content
    }
}