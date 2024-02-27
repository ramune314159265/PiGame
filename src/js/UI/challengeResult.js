import { EventRegister } from '../util/eventRegister.js'
import { PracticeMode } from '../gamemodes/index.js'

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
		sequenceData,
		elapsedTime
	}) {
		document.body.appendChild(this.component)
		this.component.querySelector('.UItop').appendChild(inputResultElement)
		this.component.querySelector('.sequenceName').textContent = sequenceData.name
		const texElement = document.createElement('math-tex')
		texElement.setTex(sequenceData.tex)
		this.component.querySelector('.sequenceTex').appendChild(texElement)
		this.component.querySelector('.minutes').textContent = Math.floor(elapsedTime / 1000 / 60)
		this.component.querySelector('.seconds').textContent = String(Math.floor(elapsedTime / 1000) % 60).padStart(2, '0')

		const firstIncorrectDigit = inputtedContent
			.split("")
			.map((digitContent, index) => {
				return {
					isCorrect: (digitContent === sequenceData.numericalSequence[index]),
					digit: index
				}
			})
			.filter(data => !data.isCorrect)[0]?.digit ?? inputtedContent.length
		const openChallengeModeButton = document.createElement('button')
		openChallengeModeButton.type = 'button'
		openChallengeModeButton.classList.add('button')
		openChallengeModeButton.textContent = '練習モードを開く(途中から)'
		openChallengeModeButton.addEventListener('click', () => {
			this.hide()
			console.log({ ...sequenceData })
			new PracticeMode({ ...sequenceData }, firstIncorrectDigit).show()
		})
		this.component.querySelector('.buttons').appendChild(openChallengeModeButton)

		this.emit('showed')
		await this.component.animate(
			[
				{ opacity: 0 },
				{ opacity: 1 }
			], {
			duration: 200,
			easing: 'ease-in-out',
		}).finished

		const animationDuration = 3000
		const animationStartTimeStamp = performance.now()
		const frameHandle = () => {
			const animationElapsedTime = performance.now() - animationStartTimeStamp
			const animationElapsedTimeRate = animationElapsedTime / animationDuration
			const animationValueChangeRate = 1 - (1 - animationElapsedTimeRate) ** 3
			if (animationElapsedTimeRate > 1) {
				this.component.querySelector('.digitLength').textContent = firstIncorrectDigit
				return
			}

			this.component.querySelector('.digitLength').textContent = Math.round(firstIncorrectDigit * animationValueChangeRate)
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
