import GameMainUI from '../UI/gamemain.js'

export default class PIGameBase {
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