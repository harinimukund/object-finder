model_status=false;
obj_array=[]
obj_name=""
function start(){
    obj_name=document.getElementById("name").value;
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    img=createCapture(VIDEO);
    img.size(380,380);
    img.hide();
    object_model=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:object detection started" ;
    
}
function modelLoaded(){
  
    model_status=true;
    console.log("model loadaed succcesfully");
}
function gotResults(e,r){
    if(e){
        console.error(e);
    }
    else{
        console.log(r);
        obj_array=r;
    }
}
function draw(){
    image(img,0,0,640,420);
    if(model_status !=false){
        
    object_model.detect(img, gotResults);
        for (i= 0;  i< obj_array.length; i++) {
          
            document.getElementById("n_obj").innerHTML=obj_array.length+" object(s) detected";
            obj_name=obj_array[i].label;
            obj_percentage=floor(obj_array[i].confidence*100);
            r=floor(random(256));
            g=floor(random(256));
            b=floor(random(256));
            if(obj_array[i].label ==obj_name){
                
                document.getElementById("status").innerHTML= obj_name+ " found" ;
                fill(r,g,b);
            textSize(20)
            text(obj_name+" "+obj_percentage+"%",obj_array[i].x+15,obj_array[i].y+15);
            stroke(r,g,b);
            noFill();
            rect(obj_array[i].x,obj_array[i].y,obj_array[i].width,obj_array[i].height);
            }
            else{
                document.getElementById("status").innerHTML="Status "+obj_name +" not detected" ;    
                
            }
            
        }
    }
 
}