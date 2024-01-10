import EventRegister from '../util/eventRegister.js'

export default class GameMainUI extends EventRegister {
    constructor() {
        super()
        this.component = document.createElement('div')
        this.component.classList.add('gameMain')
        this.component.appendChild(document.querySelector('#gameMainUI').content.cloneNode(true))

        this.output = this.component.querySelector('.outputField')
        this.keyboard = this.component.querySelector('.keyboard')

        this.component.querySelector('.back').addEventListener('click', () => {
            this.emit('closeClicked')
        })
    }
    async show() {
        document.body.appendChild(this.component)
        this.emit('showed')

        await this.component.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ], {
            duration: 200,
            easing: 'ease-in-out',
        }).finished
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