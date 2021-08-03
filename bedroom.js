img="";
status = "";
objects = [];

function preload()
{
    img= loadImage("https://pix10.agoda.net/hotelImages/376/376414/376414_16111114040048641196.jpg?s=1024x768");
}   

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
        console.log(results);
        objects = results;
}

function draw()
{
    if (status != undefined)
    {
    image(img, 0, 0, 640, 420);

        for (i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : Objects are getting Detected";

            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}