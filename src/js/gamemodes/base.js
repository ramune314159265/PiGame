import GameMainUI from '../UI/gamemain.js'

export default class PIGameBase {
    constructor(option) {
        this.UI = new GameMainUI()
        this.numericalSequence = option.numericalSequence
        this.sequenceName = option.sequenceName
        this.sequencePrefix = option.sequencePrefix
        this.digit = 0
    }
    async show() {
        this.UI.on('closeClicked', () => {
            this.hide()
        })
        this.UI.on('showed', () => {
            this.UI.output.setPrefix(this.sequencePrefix)
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