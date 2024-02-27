import { EventRegister } from '../util/eventRegister.js'
import { ChallengeMode } from '../gamemodes/index.js'

export default class PracticeResultUI extends EventRegister {
	constructor() {
		super()
		this.component = document.createElement('div')
		this.component.classList.add('resultUI')
		this.component.appendChild(document.querySelector('#resultUI').content.cloneNode(true))
	}
	async show({
		inputResultElement,
		digit,
		sequenceData
	}) {
		document.body.appendChild(this.component)
		this.component.querySelector('.UItop').appendChild(inputResultElement)
		this.component.querySelector('.digitLength').textContent = digit
		this.component.querySelector('.sequenceName').textContent = sequenceData.name
		const openChallengeModeButton = document.createElement('button')
		openChallengeModeButton.type = 'button'
		openChallengeModeButton.classList.add('button')
		openChallengeModeButton.textContent = '挑戦モードを開く'
		openChallengeModeButton.addEventListener('click',()=>{
			this.hide()
			new ChallengeMode(sequenceData).show()
		})
		this.component.querySelector('.buttons').appendChild(openChallengeModeButton)

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
