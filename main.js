var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img_Idle01 = new Image();
img_Idle01.src = 'Idle01.png' // 폴더에 저장돼있는 사진 파일명

var img_Idle01_Left = new Image();
img_Idle01_Left.src = 'Idle_left01.png'

var img_Idle_full = new Image();
img_Idle_full.src = 'Idle_full.png'

var img_Idle_full_left = new Image();
img_Idle_full_left.src = 'Idle_full_left.png'

var img_Walking_full = new Image();
img_Walking_full.src = 'Walking_full.png'

var img_Walking_full_left = new Image();
img_Walking_full_left.src = 'Walking_full_left.png'

var p1_length = 1950;
var p1_CanvasLength = 150;

var idleLoop = 4;
var idleCount = 0;
var walkingLoop = 6;
var walkingCount = 0;

var frameCount = 0;

// 등장 캐릭터의 속성부터 object자료에 정리해두면 좋다

var lookingRight = true;

var p1 ={ //캐릭터 속성
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    // (사진, 사진의 x좌표, 사진의 y좌표, 사진의 width, 사진의 height, 그릴 캔버스의 x좌표, 그릴 캔버스의 y좌표, 그릴 그림 width, 그릴 그림 height)

    draw() {

        if (isMoving == true) { //걷는 경우
            if (lookingRight == true) { //오른쪽을 보고있는 경우
                if (frameCount < 15) {
                    frameCount++;
                    ctx.drawImage(img_Walking_full, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == 15) {
                    frameCount = 0;
                    if (walkingCount == walkingLoop - 1) {
                        walkingCount = 0;
                    }
                    else {
                        walkingCount++;
                    }
                    ctx.drawImage(img_Walking_full, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
            }
    
            else { // 왼쪽을 보고있는 경우
                if (frameCount < 15) {
                    frameCount++;
                    ctx.drawImage(img_Walking_full_left, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == 15) {
                    frameCount = 0;
                    if (walkingCount == walkingLoop - 1) {
                        walkingCount = 0;
                    }
                    else {
                        walkingCount++;
                    }
                    ctx.drawImage(img_Walking_full_left, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
            }
        }

        else { // 가만히 서 있는 경우
            if (lookingRight == true) { //오른쪽을 보고있는 경우
                if (frameCount < 15) {
                    frameCount++;
                    ctx.drawImage(img_Idle_full, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == 15) {
                    frameCount = 0;
                    if (idleCount == idleLoop - 1) {
                        idleCount = 0;
                    }
                    else {
                        idleCount++;
                    }
                    ctx.drawImage(img_Idle_full, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
            }
    
            else { // 왼쪽을 보고있는 경우
                if (frameCount < 15) {
                    frameCount++;
                    ctx.drawImage(img_Idle_full_left, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == 15) {
                    frameCount = 0;
                    if (idleCount == idleLoop - 1) {
                        idleCount = 0;
                    }
                    else {
                        idleCount++;
                    }
                    ctx.drawImage(img_Idle_full_left, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
            }
        }
        
    }
}

p1.draw()

class Cactus { //장애물 클래스
    constructor() {
        this.x = 500;
        this.y = 200;//등장하는 위치
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var cactus = new Cactus();
cactus.draw()

var movingUp = false;
var movingDown = false;
var movingRight = false;
var movingLeft = false;
var isMoving = false;


function actionPerFrame() { //1초에 60번(모니터에 따라 다름) 코드를 실행함
    requestAnimationFrame(actionPerFrame);

    ctx.clearRect(0,0, canvas.width, canvas.height);
    //dino.x++;
    if (movingUp == true) {
        p1.y--;
    }

    if (movingDown == true) {
        p1.y++;
    }

    if (movingLeft == true) {
        p1.x--;
    }

    if (movingRight == true) {
        p1.x++;
    }
    cactus.draw()
    p1.draw()
}

actionPerFrame();


document.addEventListener('keydown', function(e) { //w키를 누르고 있을때 이벤트 발생 -> 위로 이동
    if (e.key === 'w') {
        movingUp = true;
        isMoving = true;
    }
})

document.addEventListener('keyup', function(e) { //w키를 누른상태에서 땠을때 발생
    if (e.key === 'w') {
        movingUp = false;
        isMoving = false;
    }
})

document.addEventListener('keydown', function(e) { //s키를 누르고 있을때 이벤트 발생 -> 아래로 이동
    if (e.key === 's') {
        movingDown = true;
        isMoving = true;
    }
})

document.addEventListener('keyup', function(e) { //s키를 누른상태에서 땠을때 발생
    if (e.key === 's') {
        movingDown = false;
        isMoving = false;
    }
})

document.addEventListener('keydown', function(e) { //a키를 누르고 있을때 이벤트 발생 -> 왼쪽으로 이동 (보는 방향 전환)
    if (e.key === 'a') {
        movingLeft = true;
        lookingRight = false;
        isMoving = true;
    }
})

document.addEventListener('keyup', function(e) { //a키를 누른상태에서 땠을때 발생
    if (e.key === 'a') {
        movingLeft = false;
        isMoving = false;
    }
})

document.addEventListener('keydown', function(e) { //d키를 누르고 있을때 이벤트 발생 -> 오른쪽으로 이동 (보는 방향 전환)
    if (e.key === 'd') {
        movingRight = true;
        lookingRight = true;
        isMoving = true;
    }
})

document.addEventListener('keyup', function(e) { //d키를 누른상태에서 땠을때 발생
    if (e.key === 'd') {
        movingRight = false;
        isMoving = false;
    }
})