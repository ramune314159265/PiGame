export default class OutputElement extends HTMLElement {
    constructor() {
        super()
    }
    #setElement() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#output').content.cloneNode(true))
        this.prefix = this.querySelector('.prefix')
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
    backspace() {
        this.output.textContent = this.output.textContent.slice(0, -1)
        this.output.scrollIntoView(false)
    }
    setComplement(number = '') {
        this.complement.textContent = number
    }
    setPrefix(content = '') {
        this.prefix.textContent = content
    }
}