export default class MathTexElement extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() { }
	setTex(tex) {
		MathJax.typesetPromise().then(() => {
			this.textContent = `$$${tex}$$`
			MathJax.typesetPromise()
		})
	}
}
