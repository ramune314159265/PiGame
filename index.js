class EventRegister {
    #events = {}

    on(name, func) {
        this.#events[name] ??= []
        this.#events[name].push(func)
    }
    emit(name, ...arg) {
        if (this.#events[name] === undefined) {
            return
        }

        this.#events[name].forEach(fn => fn(...arg))
    }
}

class KeyboardElement extends HTMLElement {
    #keyUpEventHandle
    #keyDownEventHandle
    constructor() {
        super()
    }
    static get observedAttributes() {
        return ['layouts'];
    }
    #setElement(sourceTemplate) {
        this.innerHTML = ''

        this.appendChild(sourceTemplate.content.cloneNode(true))
    }
    connectedCallback() {
        this.#setElement(KeyboardElement.layouts[this.getAttribute('layout') ?? 'calc'])
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
        this.#setElement(KeyboardElement.layouts[newValue])
    }

    static layouts = {
        'calc': document.querySelector('#calcKeyboard')
    }
    getKeyElements() {
        return this.querySelectorAll(`[data-key]`)
    }
    getKeyElement(number) {
        return this.querySelector(`[data-key="${number}"]`)
    }
}

class OutputComponent {
    constructor() {
        this.component = document.createElement('div')
        this.component.classList.add('outputField')
        this.component.appendChild(document.querySelector('#output').content.cloneNode(true))

        this.output = this.component.querySelector('.output')
        this.complement = this.component.querySelector('.complement')
    }
    addToOutput(number) {
        this.output.textContent += number
        this.output.scrollIntoView(false)
    }
    setComplement(number = '') {
        this.complement.textContent = number
    }
}

class GameMainUI extends EventRegister {
    constructor() {
        super()
        this.component = document.createElement('div')
        this.component.classList.add('gameMain')
        this.component.appendChild(document.querySelector('#gameMainUI').content.cloneNode(true))
        this.output = new OutputComponent()
        this.keyboard = this.component.querySelector('.keyboard')
        console.log(this.keyboard)

        this.component.querySelector('.back').addEventListener('click', () => {
            this.emit('closeClicked')
        })

        this.component.appendChild(this.output.component)
    }
    async show() {
        document.body.appendChild(this.component)
        await this.component.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ], {
            duration: 200,
            easing: 'ease-in-out',
        }).finished

        this.emit('showed')
    }
    async hide() {
        await this.component.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ], {
            duration: 200,
            easing: 'ease-in-out',
            fill: 'forwards',
        }).finished

        this.component.remove()
    }
}

class PIGameBase {
    constructor(numericalSequence) {
        this.UI = new GameMainUI()
        this.numericalSequence = numericalSequence
        this.digit = 0
    }
    async show() {
        await this.UI.show()

        this.UI.on('closeClicked', () => {
            this.hide()
        })
    }
    async hide() {
        await this.UI.hide()

        this.UI.component.remove()
    }
    getDigitNumber(digit = this.digit) {
        return this.numericalSequence[digit]
    }
}

class MemorizeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.on('showed', () => {
            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                if (this.getDigitNumber() === e.detail.key) {
                    this.UI.output.addToOutput(e.detail.key)
                    this.digit++
                    this.initDigit()
                }
            })

            this.initDigit()
        })
    }
    initDigit() {
        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correctHint', 'incorrect')

            node.classList.add((node.dataset.key === this.getDigitNumber()) ? 'correctHint' : 'incorrect')
        })

        this.UI.output.setComplement(this.getDigitNumber(this.digit))
    }
}

class PracticeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)
        this.correctHintTimerId = 0

        this.UI.on('showed', () => {
            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                if (this.getDigitNumber() === e.detail.key) {
                    this.UI.output.addToOutput(e.detail.key)
                    this.digit++
                    this.initDigit()
                }
            })

            this.initDigit()
        })
    }
    initDigit() {
        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correct', 'correctHint', 'incorrect')
            node.classList.add((node.dataset.key === this.getDigitNumber()) ? 'correct' : 'incorrect')

            this.UI.output.setComplement()
        })

        clearTimeout(this.correctHintTimerId)
        this.correctHintTimerId = setTimeout(() => {
            this.UI.output.setComplement(this.getDigitNumber())
            this.UI.keyboard.getKeyElement(this.getDigitNumber()).classList.add('correctHint')
        }, 5000)
    }
}

class ChallengeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.keyboard.on('keypress', number => {
            this.UI.output.addToOutput(e.detail.key)
            this.digit++
            this.initDigit()
        })

        this.initDigit()
    }
    initDigit() {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    customElements.define("numeric-keyboard", KeyboardElement);

    document.querySelector('#memorizeMode').addEventListener('click', () => {
        new MemorizeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
    document.querySelector('#practiceMode').addEventListener('click', () => {
        new PracticeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
    document.querySelector('#challengeMode').addEventListener('click', () => {
        new ChallengeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
})
