var Player = class{
    constructor(){
        this.highScore = 0;
    }
    setHighScore(score){
        if(score > this.highScore){
            this.highScore = score;
        }
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    getCharacter(){
        return this.character;
    }
    setCharacter(char){
        this.character = char;
    }


}