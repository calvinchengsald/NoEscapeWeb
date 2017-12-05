var Missle = class {
  	
  		constructor(id, name, type, direction){
  			this.id = id;
  			this.name = name;
  			this.type = type;
  			this.x = 3;
  			this.y = 3;
  			this.width = tileX - 2;
  			this.height = tileX - 2;
  			this.state = EnumEntityState.WALKING;
  			this.frame = 1;
            this.frameMax = 5;
  			this.hitWidth = this.width * 0.8;
  			this.hitHeight = this.height * 0.8;
  			this.realHitBox = new HitBox( this.getXPos()+this.width/2-this.hitWidth/2, this.getYPos()+this.height/2-this.hitHeight/2,  this.getXPos()+this.width/2+this.hitWidth/2,this.getYPos()+this.height/2+this.hitHeight/2  );
  			this.direction = direction;
            this.speed = missleSpeed[missleNamesList.indexOf(this.name)];
            this.warningTime = missleWarningTime[missleNamesList.indexOf(this.name)];
            this.type = missleType[missleNamesList.indexOf(this.name)];
            this.dead = true;
            this.frameTimerMax = 150;
            this.frameTimer = this.frameTimerMax;
            this.moveTimerMax = 60;
            this.moveTimer = this.moveTimerMax;
            this.active = false;
            this.returnTrip = false;
            if(this.direction == (EnumDirection.UP)){
                this.angle = 0 *  Math.PI / 180;
                this.speedX = 0;
                this.speedY = -this.speed;
            } else if(this.direction == (EnumDirection.DOWN)){
                this.angle = Math.PI;
                this.speedX = 0;
                this.speedY = this.speed;
            } else if(this.direction == (EnumDirection.RIGHT)){
                this.angle = Math.PI/2;
                this.speedX = this.speed;
                this.speedY = 0;
            } else if(this.direction == (EnumDirection.LEFT)){
                this.angle = Math.PI*3/2;
                this.speedX = -this.speed;
                this.speedY = 0;
            }
  			
  		}
        setMissle(newName){
            this.dead = false;
            this.name = newName;
            this.x = 0;
            this.y = 0;
            this.direction = EnumDirection.LEFT;
            this.speed = missleSpeed[missleNamesList.indexOf(this.name)];
            //console.log(this.speed);
            this.warningTime = missleWarningTime[missleNamesList.indexOf(this.name)];
            this.type = missleType[missleNamesList.indexOf(this.name)];
            this.active = false;
            this.width = tileX;
            this.height = tileX;
            this.frame = 1;
            this.hitHeight = this.height * 0.8;
            this.hitWidth = this.width * 0.8;
            this.returnTrip = false;
            
            this.rng = Math.floor(Math.random()*4);
           
            if(this.rng == 0){
                this.direction = EnumDirection.UP;
                this.y = boardDimension;
                this.x = Math.floor( Math.random()*boardDimension);
                this.angle = 0 *  Math.PI / 180;
                this.speedX = 0;
                this.speedY = -this.speed;
                if(this.type == "beam"){
                    this.width = tileX - 2;
                    this.height = boardDimension*tileX;
                    this.hitHeight = this.height;
                    this.y = 0;
                } 
            } else if(this.rng == 1){
                this.direction = EnumDirection.RIGHT;
                this.y = Math.floor( Math.random()*boardDimension);
                this.x = -1;
                this.angle = Math.PI/2;
                this.speedX = this.speed
                this.speedY = 0;
                if(this.type == "beam"){
                    this.height = tileX - 2;
                    this.width = boardDimension*tileX;
                    this.hitWidth = this.width;
                    this.x = 0;
                } 
            } else if(this.rng == 2){
                this.direction = EnumDirection.DOWN;
                this.y = -1;
                this.x = Math.floor( Math.random()*boardDimension);
                this.angle = Math.PI;
                this.speedX = 0;
                this.speedY = this.speed;
                if(this.type == "beam"){
                    this.width = tileX - 2;
                    this.height = boardDimension*tileX;
                    this.hitHeight = this.height;
                    this.y = 0;
                } 
            } else{
                this.direction = EnumDirection.LEFT;
                this.y = Math.floor( Math.random()*boardDimension);
                this.x = boardDimension;
                this.angle = Math.PI*3/2;
                this.speedX = -this.speed;
                this.speedY = 0;
                if(this.type == "beam"){
                    this.height = tileX - 2;
                    this.width = boardDimension*tileX;
                    this.hitWidth = this.width;
                    this.x = 0;
                } 
            }
            if(this.type == "bomb"){
                this.x = Math.floor(Math.random()*boardDimension);
                this.y = Math.floor(Math.random()*boardDimension);
            }
            
            
            
            
            this.realHitBox.setHitBox( this.getXPos()+this.width/2-this.hitWidth/2, this.getYPos()+this.height/2-this.hitHeight/2,                    this.getXPos()+this.width/2+this.hitWidth/2,this.getYPos()+this.height/2+this.hitHeight/2  );
            
        }
        
  		getXPos(){
  			return this.x*tileX + tileStartX;
  		}
  		getYPos(){
  			return this.y*tileX + tileStartY;
  		}
        
        update(dt){
           
            if(this.dead){return;}
            if(this.warningTime > 0){
                this.warningTime-=dt;
            }
            if(this.warningTime <= 0){
                this.active = true;
            } else {
                this.active = false;
                return;
            }
            
            this.frameTimer-=dt;
            if(this.frameTimer<=0){
                this.frameTimer += this.frameTimerMax;
                this.frame++;
                if(this.frame == 6){
                    if(  (this.type=="beam" || this.type=="bomb")){
                        this.dead = true;
                    }
                    this.frame = 1;
                }
                
            }
            
            this.moveTimer-=dt;
            if(this.moveTimer<=0){
                this.moveTimer += this.moveTimerMax;
                this.x += (this.speedX / 1000) * dt;
                this.y += (this.speedY / 1000) * dt;
                this.realHitBox.setHitBox( this.getXPos()+this.width/2-this.hitWidth/2, this.getYPos()+this.height/2-this.hitHeight/2,                    this.getXPos()+this.width/2+this.hitWidth/2,this.getYPos()+this.height/2+this.hitHeight/2  );
            }
            if(this.id == 0){
           //     console.log(this.x + " / " + this.y + " " + this.direction + " " + this.type + " " + this.returnTrip);
            }
            if(this.type =="return" && !this.returnTrip){
                if(this.direction == EnumDirection.UP && this.y <= -1){
                    this.speedY *= -1;
                    this.returnTrip = true;
                    this.direction = EnumDirection.DOWN;
                    this.angle = 2 * Math.PI/2;
                } else if(this.direction == EnumDirection.DOWN && this.y >= boardDimension){
                    this.speedY *= -1;
                    this.returnTrip = true;
                    this.direction = EnumDirection.UP;
                    this.angle = 0 * Math.PI/2;
                } else if(this.direction == EnumDirection.RIGHT && this.x >= boardDimension){
                    this.speedX *= -1;
                    this.returnTrip = true;
                    this.direction = EnumDirection.LEFT;
                    this.angle = 3 * Math.PI/2;
                } else if(this.direction == EnumDirection.LEFT && this.x <= -1){
                    this.speedX *= -1;
                    this.returnTrip = true;
                    this.direction = EnumDirection.RIGHT;
                    this.angle = 1 * Math.PI/2;
                }
                
            }
            
            
            if(this.getXPos()+this.width/2 < 0 || this.getXPos()+this.width/2 >canvasX || this.getYPos()+this.height/2 < 0 || this.getYPos()+this.height/2 >canvasY  ){
                this.dead = true;
            }
        }
  		draw(c){
            
  			if(this.dead) {return;}
            
            if(!this.active && (this.type=="bomb" || this.type == "beam") ){
                c.drawImage(imgWarning, this.getXPos(), this.getYPos(), this.width,  this.height);
                return;
            }
            //this.realHitBox.draw(c);
            
  			//c.drawImage(missleImages.get(this.name), (this.frame-1)*200, this.state*200   , 200, 200, this.getXPos(), this.getYPos(), this.width,  this.height);
            //translate to center of this image
            c.translate(this.getXPos()+this.width/2, this.getYPos()+this.height/2);
            c.rotate(this.angle);
            if(this.direction == EnumDirection.LEFT || this.direction == EnumDirection.RIGHT){
  			   c.drawImage(missleImages.get(this.name), (this.frame-1)*200, this.state*200   , 200, 200, 0 - this.height/2, 0-this.width/2, this.height,  this.width);
            } else {
                c.drawImage(missleImages.get(this.name), (this.frame-1)*200, this.state*200   , 200, 200, 0 - this.width/2, 0-this.height/2, this.width,  this.height);
            }
            c.rotate(-this.angle);
            c.translate(-(this.getXPos()+this.width/2), -(this.getYPos()+this.height/2));
  			
  		}
  	}