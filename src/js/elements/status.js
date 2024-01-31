export default class StatusElement extends HTMLElement {
    constructor() {
        super()
    }
    #set() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#statusBar').content.cloneNode(true))
        this.digitInputElement = this.querySelector('.nowDigit')
        this.digitLengthElement = this.querySelector('.digitLength')

        this.digitInputElement.addEventListener('change', e => {
            this.dispatchEvent(new CustomEvent('digitChanged', {
                detail: {
                    digit: e.target.value
                }
            }))
        })
    }
    connectedCallback() {
        this.#set()
    }
    setDigitLength(length) {
        this.digitLengthElement.textContent = length
        this.digitInputElement.max = length
    }
    setNowDigitLength(length) {
        this.digitInputElement.value = length
    }
    disableDigitInput(){
        this.digitInputElement.disabled = true
    }
}