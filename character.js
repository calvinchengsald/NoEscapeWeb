var Character = class {
  	
  		constructor( name){
  			this.name = name;
  			
  			this.x = 2;
  			this.y = 3;
  			this.width = tileX - 2;
  			this.height = tileX - 2;
  			this.hitWidth = tileX/3;
  			this.hitHeight = tileX/3;
  			this.state = EnumEntityState.WALKING;
  			this.frame = 1;
            this.frameMax = 5;
  			this.dead = false;
  			this.realHitBox = new HitBox( this.getXPos()+this.width/2-this.hitWidth/2, 
                                         this.getYPos()+this.height/2-this.hitHeight/2, this.getXPos()+this.width/2+this.hitWidth/2,this.getYPos()+this.height/2+this.hitHeight/2  );
            this.frameTimerMax = 150;
            this.frameTimer = this.frameTimerMax;
  		}
  		getXPos(){
  			return this.x*tileX + tileStartX;
  		}
  		getYPos(){
  			return this.y*tileX + tileStartY;
  		}
        intersectBox(missleBox){
            if (this.realHitBox.x1 > missleBox.x1 && this.realHitBox.x1 < missleBox.x2 && 
                (this.realHitBox.y1 > missleBox.y1 && this.realHitBox.y1 < missleBox.y2 ||
                 this.realHitBox.y2 > missleBox.y1 && this.realHitBox.y2 < missleBox.y2)) {return true;}
            if (this.realHitBox.x2 > missleBox.x1 && this.realHitBox.x1 < missleBox.x2 &&
                (this.realHitBox.y1 > missleBox.y1 && this.realHitBox.y1 < missleBox.y2 ||
                 this.realHitBox.y2 > missleBox.y1 && this.realHitBox.y2 < missleBox.y2)) {return true;}
        }
        
        move(dir){
            if(dir ==EnumDirection.UP){
                this.y -= 1;
            } else if(dir ==EnumDirection.DOWN){
                this.y += 1;
            } else if(dir ==EnumDirection.LEFT){
                this.x -= 1;
            } else if(dir ==EnumDirection.RIGHT){
                this.x += 1;
            }
            if(this.y>boardDimension-1) {this.y = boardDimension-1;}
            if(this.y<0) {this.y = 0;}
            if(this.x>boardDimension-1) {this.x = boardDimension-1;}
            if(this.x<0) {this.x = 0;}
            
  			this.realHitBox.setHitBox( this.getXPos()+this.width/2-this.hitWidth/2, 
                                         this.getYPos()+this.height/2-this.hitHeight/2, this.getXPos()+this.width/2+this.hitWidth/2,this.getYPos()+this.height/2+this.hitHeight/2  );
        }   
  		update(dt){
            if(this.dead){return;}
            this.frameTimer-=dt;
            if(this.frameTimer<=0){
                this.frameTimer += this.frameTimerMax;
                this.frame++;
                if(this.frame == 6){
                    if(this.state==EnumEntityState.DYING){
                        this.dead = true;
                    }
                    this.frame = 1;
                }
            }
            if(this.state == EnumEntityState.DYING || this.dead){return;}
            for(i = 0;  i<missleList.length; i++){
                if(missleList[i].dead ||!missleList[i].active){
                    return;
                }
                if(this.intersectBox(missleList[i].realHitBox)){
                    this.state = EnumEntityState.DYING;
                }
            }
        }
        
  		draw(c){
  			if(this.dead) {return;}
  			c.drawImage(spriteImages.get(this.name), (this.frame-1)*200, this.state*200   , 200, 200, this.getXPos(), this.getYPos(), tileX, tileX);
  			this.realHitBox.draw(c);
  		}
  	}