const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
let endGame = false;
let errorMassage ="";

class Field {
    field = [];
    constructor() {
        this.locationX = 0;
        this.locationY = 0;
    
        for(let i = 0; i < col; i++){
            this.field[i] = [];
        }

        this.generateField(row, col, 0.20);
    }

    generateField(height, width, percentage) {
        for (let y = 0; y < height; y++) {
            for ( let x = 0; x < width; x++){
                    const prob = Math.random();
                    (prob > percentage) ? this.field[y][x] =  fieldCharacter : this.field[y][x] =  hole;
            }
        }
//------  set * to start point.
        this.field[0][0] = pathCharacter;
//------  To set ^ at random place.
        this.field[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)] = hat;

    }

    runGame() {     
        this.print();
        this.askQuestion();
    }
//------    Print the field ------
//------    Using loop to display the field ---------
//------    Using red color to display current location ------
    print() {
        let displayString ="";
        clear();
        for(let i = 0 ; i < row ; i++){
            for(let j = 0 ; j < col ; j++){
                if(i==this.locationY && j==this.locationX) {
//------    red code "\x1b[31m"     reset code "\x1b[0m"    ------
//------    reset color to default after display    ------
                    displayString += `\x1b[31m${this.field[i][j]}\x1b[0m`;
                } else {
                    displayString += this.field[i][j];
                }
            }
            displayString += "\n";
        }
//------ default method ------
        /* const displayString = this.field.map(row => {
             return row.join('');
         }).join("\n");
         */
        console.log(displayString);
    }

//------    Checking for move   ------
    gameChecking(x,y){
//------    pre-assign next x,y location
        x += this.locationX;
        y += this.locationY;
//------    To check withing 0-9 ------
        if(x < 0 || x > 9 || y < 0 || y > 9){
            console.log("Out Of bound");
            endGame = true;
//------    To check next move is it a hole  ------            
        } else if (this.field[y][x] == hole) {
           console.log("Sorry, you fell down a hole!");
           endGame = true;
//------    To check next move is it a hat  ------  
        } else if (this.field[y][x] == hat) {
            console.log("Congrats, you found your hat!");
            endGame = true;
//------    Move * to next location ------
        } else {
            this.locationX = x;
            this.locationY = y;
            this.field[this.locationY][this.locationX] = pathCharacter;
            endGame = false;
       }

    }

//------    Asking Question ------
    askQuestion(){
//------    Use global veriable to store error message so that can display it after I clear the screen ------
//------    Clear the message after display so it wont execute the error message if nothing get wrong ------
        if(errorMassage !="") {
            console.log(errorMassage);
            errorMassage = "";
        }
        const answer = prompt("Which way ? ").toUpperCase();

        switch (answer) {
            case "L" :
                this.gameChecking(-1,0)
                break;
            case "R" :
                this.gameChecking(1,0)
                break;
            case "U" :
                this.gameChecking(0,-1)
                break;
            case "D" :
                this.gameChecking(0,1)
                break;
            default :
                errorMassage = "Invalid Seletion. Please Enter U, D, L, R";
            }

//------    To keep repeat if game is not end   ------
            if(!endGame) this.runGame();
    }
}// End of class

const myfield = new Field();
myfield.runGame();
