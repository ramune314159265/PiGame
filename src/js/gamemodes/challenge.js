import PIGameBase from './base.js'
import ChallengeResultUI from '../UI/challengeResult.js'

export default class ChallengeMode extends PIGameBase {
	constructor(option) {
		super(option)
		this.inputtedContent = ''
		this.startTimeStamp = 0
		this.lastPressedTimeStamp = 0

		this.UI.on('showed', () => {
			this.UI.status.disableDigitInput()
			this.UI.status.disableHintButton()
		})
	}
	numKeyPressed(key) {
		this.inputtedContent += key
		this.digit++
		this.initDigit()

		if (this.startTimeStamp === 0) {
			this.timerStart()
		}
		this.lastPressedTimeStamp = Date.now()
	}
	enterPressed() {
		this.UI.hide()

		const resultUI = new ChallengeResultUI()
		resultUI.show({
			inputtedContent: this.inputtedContent,
			sequenceData: this.sequenceData,
			elapsedTime: this.lastPressedTimeStamp - (this.startTimeStamp ?? Date.now())
		})
	}
	backSpacePressed() {
		if (this.digit <= 0) {
			return
		}
		this.inputtedContent = this.inputtedContent.slice(0, this.inputtedContent.length - 1)
		this.digit--
		this.initDigit()
		this.lastPressedTimeStamp = Date.now()
	}
	initDigit(digit = this.digit) {
		this.digit = digit
		this.UI.status.setNowDigitLength(this.digit)

		this.UI.output.setOutput(this.inputtedContent)
	}
	timerStart() {
		this.startTimeStamp = Date.now()
		this.timerHandle()
		const interbalId = setInterval(() => this.timerHandle(), 1000)

		this.UI.on('closeClicked', () => {
			clearInterval(interbalId)
		})
	}
	timerHandle() {
		const diffSecond = Math.round((Date.now() - this.startTimeStamp) / 1000)
		this.UI.status.setTime(diffSecond)
	}
}
