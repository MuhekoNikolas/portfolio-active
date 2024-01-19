

class SelfWriter{
    constructor(writingCollection, writingContainer){

        this.writingCollection = writingCollection
        this.writingContainer = writingContainer
        this.writingContainer.innerHTML = ""
        this.currentWord = 0
        this.currentIndex = 0
        this.direction = "right"

        this.alreadyWritten = ""

        this.interval = setInterval( ()=>{this.write(this)}, 100)
    }

    write(object){
        object.checkIndex()

        if(object.currentWord >= object.writingCollection.length){
            object.currentWord = 0
            object.currentIndex = -1
            object.alreadyWritten = ""
            object.writingContainer.innerHTML = ""
            object.direction = "right"

        } else if(object.direction == "right"){
            object.writeRight()
        } else if(object.direction == "left"){
            object.writeLeft()
        }
        //console.log(object.alreadyWritten)
    }

    writeRight(){

        this.alreadyWritten = this.writingCollection[this.currentWord].slice(0, this.currentIndex+1)

        this.writingContainer.textContent = this.alreadyWritten
        this.currentIndex += 1
    }

    writeLeft(){

        this.alreadyWritten = this.writingCollection[this.currentWord].slice(0, this.currentIndex+1)
        this.writingContainer.textContent = this.alreadyWritten
        
        this.currentIndex -= 1
    }

    checkIndex(){
        //console.log(this.currentIndex, this.currentWord)
        if(this.currentIndex < 0 && this.direction == "left"){
            this.currentIndex = 0
            this.currentWord = this.currentWord + 1
            this.direction = "right"
        } else if(this.currentIndex >= this.writingCollection[this.currentWord].length && this.direction == "right"){
            this.currentIndex = this.writingCollection[this.currentWord].length - 1
            this.direction = "left"
            this.delay(20000)
        }

    }

    delay(loops){
        for(let _=0; _<=loops; _++){
            for(let _=0; _<=loops; _++){
            
            }
        }
    }


}