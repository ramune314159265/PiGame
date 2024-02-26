import { EventRegister } from '../util/eventRegister.js'

export default class ChallengeResultUI extends EventRegister {
	constructor() {
		super()
		this.component = document.createElement('div')
		this.component.classList.add('resultUI')
		this.component.appendChild(document.querySelector('#resultUI').content.cloneNode(true))
	}
	async show({
		inputResultElement,
		inputtedContent,
		sequenceData
	}) {
		document.body.appendChild(this.component)
		this.component.querySelector('.UItop').appendChild(inputResultElement)
		this.component.querySelector('.sequenceName').textContent = sequenceData.name

		const firstIncorrectDigit = inputtedContent
			.split("")
			.map((digitContent, index) => {
				return {
					isCorrect: (digitContent === sequenceData.numericalSequence[index]),
					digit: index
				}
			})
			.filter(data => !data.isCorrect)[0]?.digit ?? inputtedContent.length
		const texElement = document.createElement('math-tex')
		texElement.setTex(sequenceData.tex)
		this.component.querySelector('.sequenceTex').appendChild(texElement)

		this.emit('showed')
		await this.component.animate(
			[
				{ opacity: 0 },
				{ opacity: 1 }
			], {
			duration: 200,
			easing: 'ease-in-out',
		}).finished

		const digitAnimationDuration = 3000
		const startTimeStamp = performance.now()
		const frameHandle = () => {
			const elapsedTime = performance.now() - startTimeStamp
			const elapsedTimeRate = elapsedTime / digitAnimationDuration
			const valueChangeRate = 1 - (1 - elapsedTimeRate) ** 3
			if (elapsedTimeRate > 1) {
				this.component.querySelector('.digitLength').textContent = firstIncorrectDigit
				return
			}

			this.component.querySelector('.digitLength').textContent = Math.round(firstIncorrectDigit * valueChangeRate)
			requestAnimationFrame(frameHandle)
		}
		requestAnimationFrame(frameHandle)

		this.component.querySelector('.back').addEventListener('click', () => {
			this.hide()
		})
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
