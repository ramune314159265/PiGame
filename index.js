class PIGameBase{
    constructor(numericalSequence){
        this.numericalSequence = numericalSequence
        this.digit = 0
    }
    get digitNumber(){
        return numericalSequence[this.digit]
    }
}