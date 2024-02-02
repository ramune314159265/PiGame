export default class StatusElement extends HTMLElement {
    constructor() {
        super()
    }
    #set() {
        this.innerHTML = ''

        this.appendChild(document.querySelector('#statusBar').content.cloneNode(true))
        this.digitInputElement = this.querySelector('.nowDigit')
        this.digitLengthElement = this.querySelector('.digitLength')
        this.showHintButtonElement = this.querySelector('.showHint')

        this.digitInputElement.addEventListener('change', e => {
            this.dispatchEvent(new CustomEvent('digitChanged', {
                detail: {
                    digit: e.target.value
                }
            }))
        })
        this.showHintButtonElement.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent('hintClicked', {}))
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
    disableDigitInput() {
        this.digitInputElement.disabled = true
    }
    enableHintButton() {
        this.showHintButtonElement.disabled = false
    }
    disableHintButton() {
        this.showHintButtonElement.disabled = true
    }
}