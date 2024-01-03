class EventRegister {
    this.#events = {}
    constructor() { }
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

class KeyboardUI extends EventRegister {
    constructor(layout) {
        super()
        const layouts = {
            'calc': document.querySelector('#calcKeyboard')
        }
        this.component = layouts[layout].content.cloneNode(true)

        this.component.childNodes.forEach(node => {
            node.addEventListener('click', e => {
                if (!e.target.dataset.key) {
                    return
                }
                this.emit('keypress', e.target.dataset.key)
            })
        })
    }
    getKeyElement(number){
        return this.component.querySelector(`[data-key=${number}]`)
    }
}

class OutputUI {
    constructor() {
        this.component = document.querySelector('#output').content.cloneNode(true)
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
        this.output = new OutputUI()
        this.keyboard = new KeyboardUI('calc')

        this.component.querySelector('.outputField').appendChild(this.output.component)
        this.component.querySelector('.keyboard').appendChild(this.keyboard.component)
    }
}

class PIGameBase {
    constructor(numericalSequence) {
        this.UI = new GameMainUI()
        this.numericalSequence = numericalSequence
        this.digit = 0

        document.body.appendChild(this.UI.component)
    }
    getDigitNumber(digit = this.digit) {
        return this.numericalSequence[digit]
    }
}

class PracticeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence);

        this.UI.keyboard.on('keypress', number => {
            switch (true) {
                case Number.isNaN(parseInt(number)):

                    break;
                default:
                    if (this.getDigitNumber() === number) {
                        this.UI.output.addToOutput(number)
                        this.digit++
                    }

                    break;
            }
        })
    }
}