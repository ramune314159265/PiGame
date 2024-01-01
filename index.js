class EventRegister {
    constructor() { this.events = {} }
    on(name, func) {
        if (this.events[name] === undefined) this.events[name] = new Array()
        this.events[name].push(func)
    }
    emit(name, ...arg) {
        if (this.events[name] === undefined) return
        this.events[name].forEach(fn => fn(...arg))
    }
}

class KeyboardUI extends EventRegister {
    constructor(layout) {
        super()
        const layouts = {
            'calc': document.querySelector('#calcKeyboard')
        }
        this.component = layouts[layout].content.cloneNode(true);
        this.component.childNodes.forEach(node => {
            node.addEventListener('click', e => {
                if (!e.target.dataset.key) {
                    return
                }
                this.emit('keypress', e.target.dataset.key)
            })
        })
    }
}

class PIGameBase {
    constructor(numericalSequence) {
        this.numericalSequence = numericalSequence
        this.digit = 0
    }
    getDigitNumber(digit = this.digit) {
        return numericalSequence[digit]
    }
}

class PracticeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence);
    }
}

const test = document.createElement('div')
test.classList.add('keyboard')
const keyboardUI = new KeyboardUI('calc')
test.appendChild(keyboardUI.component)
document.body.appendChild(test)
keyboardUI.on('keypress', console.log)