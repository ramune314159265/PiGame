import GameMainUI from '../UI/gamemain.js'

export default class PIGameBase {
	constructor(option) {
		this.UI = new GameMainUI()
		this.sequenceData = {
			numericalSequence: option.numericalSequence,
			name: option.sequenceName,
			prefix: option.sequencePrefix,
			base: option.sequenceBase,
			tex: option.sequenceTex
		}
		this.digit = 0
	}
	async show() {
		this.UI.on('closeClicked', () => {
			this.hide()
		})
		this.UI.on('showed', () => {
			this.UI.keyboard.setKeyLayout({ base: this.sequenceData.base })
			this.UI.status.setDigitLength(this.sequenceData.numericalSequence.length)
			this.UI.output.setPrefix(this.sequenceData.prefix)
			this.UI.setTitle({ name: this.sequenceData.name, tex: this.sequenceData.tex })
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

			this.initDigit()
		})

		await this.UI.show()
	}
	async hide() {
		await this.UI.hide()

		this.UI.component.remove()
	}
	getDigitNumber(digit = this.digit) {
		return this.sequenceData.numericalSequence[digit]
	}
}
