import { EventRegister } from '../util/eventRegister.js'
import { ChallengeMode } from '../gamemodes/index.js'

export default class PracticeResultUI extends EventRegister {
	constructor() {
		super()
		this.component = document.createElement('div')
		this.component.classList.add('resultUI')
		this.component.appendChild(document.querySelector('#practiceResultUI').content.cloneNode(true))
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
		this.component.querySelector('.openChallengeMode').addEventListener('click', () => {
			this.hide()
			new ChallengeMode(sequenceData).show()
		})

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
