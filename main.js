var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

createFillArray = function(len, n) {
    return new Array(len).fill(n);
}

collisonCheckX = createFillArray(canvas.width, -1); //캔버스의 가로 길이만큼의 x좌표계 생성. 기본 원소값은 전부 -1 -> 물체가 없는 상태
                                                    //물체가 생기면 해당 x좌표를 1로 바꿔줌.

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
var p1_CanvasLength = 100; //화면에 표시되는 주인공의 가로,세로 길이

var idleLoop = 4; //서있는 모션 총 컷의 수
var idleCount = 0;
var walkingLoop = 6; //걷는 모션 총 컷의 수
var walkingCount = 0;
var refreshRate = 30; // 주사율 -> ex) 20이면 20frame 마다 다음 장면으로 넘어감
var frameCount = 0;

// 등장 캐릭터의 속성부터 object자료에 정리해두면 좋다

var lookingRight = true;

var p1 ={ //캐릭터 속성
    x : 400,
    y : 200,
    width : p1_CanvasLength - 20,
    height : p1_CanvasLength,
    // (사진, 사진의 x좌표, 사진의 y좌표, 사진의 width, 사진의 height, 그릴 캔버스의 x좌표, 그릴 캔버스의 y좌표, 그릴 그림 width, 그릴 그림 height)

    draw() {

        if (isMoving == true) { //걷는 경우
            if (lookingRight == true) { //오른쪽을 보고있는 경우
                if (frameCount < refreshRate) {
                    frameCount++;
                    ctx.drawImage(img_Walking_full, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == refreshRate) {
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
                if (frameCount < refreshRate) {
                    frameCount++;
                    ctx.drawImage(img_Walking_full_left, p1_length * walkingCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == refreshRate) {
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
                if (frameCount < refreshRate) {
                    frameCount++;
                    ctx.drawImage(img_Idle_full, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == refreshRate) {
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
                if (frameCount < refreshRate) {
                    frameCount++;
                    ctx.drawImage(img_Idle_full_left, p1_length * idleCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
        
                else if(frameCount == refreshRate) {
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

class Obstacle { //장애물 클래스
    constructor() {
        this.x = 700;
        this.y = 200;//등장하는 위치
        this.width = 50;
        this.height = 100;
        this.color = 'red'
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        collisonCheckX[this.x] = 1;
        collisonCheckX[this.x + this.width] = 1; //물체가 생성될때 충돌 여부를 확인할 수 있게 '이 x좌표에 오면 충돌한걸로 알리겠다' 라는 의미
    } //만약 물체도 움직이는 경우도 해결 해야함

}

var obstacle = new Obstacle();
obstacle.draw()

var obstacle2 = new Obstacle();
obstacle2.x = 200;
obstacle2.color = 'blue';

var obstacle3 = new Obstacle();
obstacle3.x = 800;

var obstacle4 = new Obstacle();
obstacle4.x = 900;

var movingUp = false;
var movingDown = false;
var movingRight = false;
var movingLeft = false;
var isMoving = false;


function actionPerFrame() { //1초에 60번(모니터에 따라 다름) 코드를 실행함
    requestAnimationFrame(actionPerFrame);

    ctx.clearRect(0,0, canvas.width, canvas.height);

    //배경 부분
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //바닥 부분
    ctx.fillStyle = 'black';
    ctx.fillRect(0, p1.y + 100, canvas.width, canvas.height);

    //충돌이 없는 경우에만 주인공의 x, y좌표 갱신
    if (movingUp == true) {
        p1.y--;
    }

    if (movingDown == true) {
        p1.y++;
    }
    //좌표계를 이용해 충돌 확인 
    if (movingLeft == true && collisonCheckX[(p1.x - 1)] == -1) { //왼쪽 충돌 여부 확인 후 왼쪽으로 이동
        p1.x--;
    }

    if (movingRight == true && collisonCheckX[(p1.x + p1_CanvasLength + 1)] == -1) { //오른쪽 충돌 여부 확인 후 오른쪽으로 이동
        p1.x++;
    }
    obstacle.draw()
    obstacle2.draw()
    obstacle3.draw()
    obstacle4.draw()
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