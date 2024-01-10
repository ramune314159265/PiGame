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

class KeyboardComponent extends EventRegister {
    constructor(layout) {
        super()
        const layouts = {
            'calc': document.querySelector('#calcKeyboard')
        }
        this.component = document.createElement('div')
        this.component.classList.add('keyboard')
        this.component.appendChild(layouts[layout].content.cloneNode(true))

        this.component.childNodes.forEach(node => {
            if (!node.dataset?.key) {
                return
            }

            node.addEventListener('click', e => {
                this.emit('keypress', e.target.dataset.key)
            })
        })
    }
    getKeyElements() {
        return this.component.querySelectorAll(`[data-key]`)
    }
    getKeyElement(number) {
        return this.component.querySelector(`[data-key="${number}"]`)
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

class GameMainComponent extends EventRegister {
    constructor() {
        super()
        this.component = document.createElement('div')
        this.component.classList.add('gameMain')
        this.component.appendChild(document.querySelector('#gameMainUI').content.cloneNode(true))
        this.output = new OutputComponent()
        this.keyboard = new KeyboardComponent('calc')

        this.component.querySelector('.back').addEventListener('click', () => {
            this.emit('closeClicked')
        })

        this.component.appendChild(this.output.component)
        this.component.appendChild(this.keyboard.component)
    }
}

class PIGameBase {
    constructor(numericalSequence) {
        this.UI = new GameMainComponent()
        this.numericalSequence = numericalSequence
        this.digit = 0
    }
    async show() {
        document.body.appendChild(this.UI.component)

        this.UI.on('closeClicked', () => {
            this.hide()
        })
        await this.UI.component.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ], {
            duration: 200,
            easing: 'ease-in-out',
        }).finished

        this.keyDownEventHandle = e => {
            if (e.key === 'Escape') {
                this.hide()
                return
            }

            const keyElement = this.UI.keyboard.getKeyElement(e.key)
            if (!keyElement) {
                return
            }

            keyElement.classList.add('active')
        }
        this.keyUpEventHandle = e => {
            const keyElement = this.UI.keyboard.getKeyElement(e.key)
            if (!keyElement) {
                return
            }

            keyElement.click()
            keyElement.classList.remove('active')
        }
        document.addEventListener('keydown', this.keyDownEventHandle)
        document.addEventListener('keyup', this.keyUpEventHandle)
    }
    async hide() {
        await this.UI.component.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ], {
            duration: 200,
            easing: 'ease-in-out',
            fill: 'forwards',
        }).finished

        document.removeEventListener('keydown', this.keyDownEventHandle)
        document.removeEventListener('keyup', this.keyUpEventHandle)
        this.UI.component.remove()
    }
    getDigitNumber(digit = this.digit) {
        return this.numericalSequence[digit]
    }
}

class MemorizeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.keyboard.on('keypress', number => {
            if (this.getDigitNumber() === number) {
                this.UI.output.addToOutput(number)
                this.digit++
                this.initDigit()
            }
        })

        this.initDigit()
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

        this.UI.keyboard.on('keypress', number => {
            if (this.getDigitNumber() === number) {
                this.UI.output.addToOutput(number)
                this.digit++
                this.initDigit()
            }
        })

        this.initDigit()
    }
    initDigit() {
        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correct', 'correctHint', 'incorrect')

            node.classList.add((node.dataset.key === this.getDigitNumber()) ? 'correct' : 'incorrect')
        })

        clearTimeout(this.correctHintTimerId)
        this.correctHintTimerId = setTimeout(() => {
            console.log('a')
            this.UI.keyboard.getKeyElement(this.getDigitNumber()).classList.add('correctHint')
        }, 5000)
    }
}

class ChallengeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.keyboard.on('keypress', number => {
            this.UI.output.addToOutput(number)
            this.digit++
            this.initDigit()
        })

        this.initDigit()
    }
    initDigit() {
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
