var Room = class {

    constructor(){
        this.playerList = new Array;
        this.playerNameList = new Array;
     //   this.playerNameList[0] = "2";
    }
    
    getPlayerList(){
        return playerList;
    }
    addPlayerList(player){
        this.playerList[this.playerList.length] = player;
    }
    hasPlayerInList(name){
        for(i = 0; i < this.playerList.length; i++){
            if(this.playerList[i].name == name){
                return true;
            }
        }
        return false;
    }
    getPlayerNameList(){
        return this.playerNameList;
    }
    addPlayerNameList(player){
        this.playerNameList[this.playerNameList.length] = player;
        console.log("in rooom " +this.playerNameList.toString());
    }
    hasPlayerNameInList(name){
        for(i = 0; i < this.playerNameList.length; i++){
            if(this.playerNameList[i] == name){
                return true;
            }
        }
        return false;
    }
    clearPlayerNameList(){
        this.playerNameList = new Array;
    }



}