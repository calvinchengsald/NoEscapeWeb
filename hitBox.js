

var HitBox = class {
  		constructor(x1,y1,x2,y2){
  			this.x1 = x1;
  			this.x2 = x2;
  			this.y1 = y1;
  			this.y2 = y2;
  		}
  		setHitBox(x1,y1,x2,y2){
  			this.x1 = x1;
  			this.x2 = x2;
  			this.y1 = y1;
  			this.y2 = y2;
  		}
  		draw(c){
  			//console.log(this.x1 + " " + this.y1 + " " + this.x2-this.x1 + " " + this.y2);
  			c.fillRect(this.x1,this.y1,this.x2-this.x1,this.y2-this.y1);
  			//c.fillRect(240,240,10,10);
  		}
  		
  		
  	}