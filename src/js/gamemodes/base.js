import GameMainUI from '../UI/gamemain.js'

export default class PIGameBase {
    constructor(option) {
        this.UI = new GameMainUI()
        this.numericalSequence = option.numericalSequence
        this.sequenceName = option.sequenceName
        this.sequencePrefix = option.sequencePrefix
        this.sequenceBase = option.sequenceBase
        this.digit = 0
    }
    async show() {
        this.UI.keyboard.setAttribute("base", this.sequenceBase)


        this.UI.on('closeClicked', () => {
            this.hide()
        })
        this.UI.on('showed', () => {
            this.UI.status.setDigitLength(this.numericalSequence.length)
            this.UI.output.setPrefix(this.sequencePrefix)

            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                switch (e.detail.key) {
                    case 'Backspace':
                        this.backSpacePressed()
                        break

                    case 'Enter':
                        this.enterPressed()
                        break

                    default:
                        this.numKeyPressed(e.detail.key)
                        break
                }
            })

            this.UI.keyboard.focus()
        })

        await this.UI.show()
    }
    async hide() {
        await this.UI.hide()

        this.UI.component.remove()
    }
    getDigitNumber(digit = this.digit) {
        return this.numericalSequence[digit]
    }
}