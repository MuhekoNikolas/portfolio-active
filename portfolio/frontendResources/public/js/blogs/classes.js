


class BannerGenerator{
    constructor(){
        this.bannerWidth = 750
        this.bannerHeight = 300
        this.canvas = document.createElement("canvas")

        this.fontSize = 45
        this.lineHeight = this.fontSize + 10
        this.textMarginLeft = 40
        this.textMarginTop = 80
    }

    getGradientCombo(){
        let gradientCombos = [["#FFD3A5", "#FD6585"], ["#0F3443", "#34E89E"], ["#12C2E9", "#F64F59"], ["#FCCF31", "#F55555"], ["#7F7FD5", "#91EAE4"], ["#3E5151", "#DECBA4"], ["#333399", "#FF00CC"], ["#31B7C2", "#7BC393"]]

        let randomIndex = Math.floor(Math.random() * gradientCombos.length)

        return gradientCombos[randomIndex]
    }

    wrapText(text, x=20, y=20) {
        // First, start by splitting all of our text into words, but splitting it into an array split by spaces
        let words = text.split(' ');
        let line = ''; // This will store the text of the current line
        let testLine = ''; // This will store the text when we add a word, to test if it's too long
        let lineArray = []; // This is an array of lines, which the function will return
    
        // Lets iterate over each word
        for(var n = 0; n < words.length; n++) {
            // Create a test line, and measure it..
            testLine += `${words[n]} `;
            let metrics = this.bannerContext.measureText(testLine);
            let testWidth = metrics.width;
            // If the width of this test line is more than the max width
            if (testWidth > this.bannerWidth-this.textMarginLeft && n > 0) {
                //Check to see is y will overlap the canvas height
                if(y + this.lineHeight > this.bannerHeight-(this.textMarginTop/3)){
                    line = line.substring(0, line.length-1) + "..."
                    lineArray.push([line, x, y]);
                    break 
                } 

                lineArray.push([line, x, y]);
                // Increase the line height, so a new line is started
                y += this.lineHeight;
                // Update line and test line to use this word as the first word on the next line
                line = `${words[n]} `;
                testLine = `${words[n]} `;
        
            }
            else {
                // If the test line is still less than the max width, then add the word to the current line
                line += `${words[n]} `;
            }
            // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
            if(n === words.length - 1) {
                lineArray.push([line, x, y]);
            }
        }
        // Return the line array
        return [lineArray, y];
    }

    resetCanvas(width=null, height=null){
        this.bannerWidth = width || this.bannerWidth
        this.bannerHeight = height || this.bannerHeight

        this.canvas.width = this.bannerWidth
        this.canvas.height = this.bannerHeight

        this.bannerContext = this.canvas.getContext("2d")
    }

    setBannerBackgroundColor(color="#ffef62"){
        this.bannerContext.fillStyle = color;
        this.bannerContext.fillRect(0, 0, this.bannerWidth, this.bannerHeight);
    }

    addText(title="Hello, there."){
        let grd = this.bannerContext.createLinearGradient(0, 1200, 800, 0);
        let grdColorCombo = this.getGradientCombo()
        grd.addColorStop(0, grdColorCombo[0]);
        grd.addColorStop(1, grdColorCombo[1]);
        this.bannerContext.fillStyle = grd;
        this.bannerContext.fillRect(0, 0, 1200, 800);

        // More text
        this.bannerContext.font = `700 ${this.fontSize}px Helvetica`;
        this.bannerContext.fillStyle = 'white';

        // Write text to image.
        let wrappedT = this.wrapText(title, this.textMarginLeft, this.textMarginTop);

        let wrappedText = wrappedT[0]
        let wrappedTextLastY = wrappedT[1]

        let textYOffset = 0

        if(wrappedTextLastY + this.lineHeight < this.bannerHeight-(this.textMarginTop/3)){
            textYOffset = (( this.bannerHeight - wrappedTextLastY) / 2 ) - this.lineHeight/2
        }


        wrappedText.forEach(function(item) {
            this.bannerContext.fillText(item[0], item[1], item[2]+textYOffset); 
            //this.bannerContext.fillText(title, this.bannerWidth / 2, this.bannerHeight / 2);
        }.bind(this))

    }

    getDataUrl(){
        return this.canvas.toDataURL("image/png")
    }

    generateBanner(title="Hello"){
        this.resetCanvas()
        this.setBannerBackgroundColor()
        this.addText(title=title)
        return this.getDataUrl()
    }
    
}
