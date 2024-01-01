class PIGameBase {
    constructor(numericalSequence) {
        this.numericalSequence = numericalSequence
        this.digit = 0
    }
    getDigitNumber(digit = this.digit) {
        return numericalSequence[digit]
    }
}

class PracticeMode extends PIGameBase{
    constructor(numericalSequence){
        super(numericalSequence);
    }
}