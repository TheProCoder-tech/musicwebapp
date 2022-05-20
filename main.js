Song1="";
Song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
statusSong1 = "";
statusSong2 = "";

function preload(){
    Song1=loadSound("music.mp3");
    Song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600, 550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 550);
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        Song1.stop();
        if(statusSong2==false){
            Song2.play();
            document.getElementById("song_name").innerHTML = "playing - Peter Pan Song";
        }
    }
}
function modelLoaded(){
    console.log("poseNet is intialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    }
}