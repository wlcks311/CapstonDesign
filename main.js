var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;

createFillArray = function(len, n) {
    return new Array(len).fill(n);
}

collisonCheckX = createFillArray(canvas.width, -1); //캔버스의 가로 길이만큼의 x좌표계 생성. 기본 원소값은 전부 -1 -> 물체가 없는 상태
defaultArr_X = createFillArray(canvas.width, -1);    //물체가 생기면 해당 x좌표를 1로 바꿔줌.

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

var img_Middle_Attack_full = new Image();
img_Middle_Attack_full.src = 'Middle_Attack_full.png'

var img_Middle_Attack_full_left = new Image();
img_Middle_Attack_full_left.src = 'Middle_Attack_full_left.png'


var p1_length = 1950;
var p1_CanvasLength = 150; //화면에 표시되는 주인공의 가로,세로 길이

var idleLoop = 4; //서있는 모션 총 컷의 수

var walkingLoop = 6; //걷는 모션 총 컷의 수
var attackLoop = 6; //공격 모션 총 컷의 수

var idleCount = 0;

var walkingCount = 0;
var refreshRate = 30; // 주사율 -> ex) 20이면 20frame 마다 다음 장면으로 넘어감
var frameCount = 0;

var isAttacking = false; //공격중인지 여부 -> 공격중일 때는 움직이지 못하도록
var isAttacking_motion = false; //공격 동작모션에 대한 변수 -> 실제 공격상자랑 모션이랑 차이가 있음
var attackTimer = 0; // 공격 누적 시간 기록

var attackCount = 0;
var attackFrame = 0; //공격 장면 프레임 정보

// 등장 캐릭터의 속성부터 object자료에 정리해두면 좋다

var lookingRight = true;

class MainCharacter {
    constructor() {
        this.x = 400;
        this.y = 150;
        this.width = p1_CanvasLength - 20;
        this.height = p1_CanvasLength;
        this.attackBox = {
            position_x : this.x + p1_CanvasLength / 2, //공격 상자의 x좌표 -> 캐릭터 가운데
            position_y : this.y,                       //공격 상자의 y좌표 -> 캐릭터와 동일
            width : 80, //공격 가로 범위
            height : 50 //공격 세로 범위
        }
    }
    draw() {

        if (isAttacking_motion == true) { //공격 하는 경우 -> 움직일 수 없음
            if (lookingRight == true) {
                if (attackFrame < 20) {
                    attackFrame++;
                    ctx.drawImage(img_Middle_Attack_full, p1_length * attackCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
                else if(attackFrame == 20) {
                    attackFrame = 0;
                    if (attackCount == attackLoop - 1) {
                        attackCount = 0;
                        isAttacking_motion = false; //공격 동작 종료
                    }

                    else {
                        attackCount++;
                    }
                }
            }

            else if (lookingRight == false) {
                if (attackFrame < 20) {
                    attackFrame++;
                    ctx.drawImage(img_Middle_Attack_full_left, p1_length * attackCount, 0, p1_length, p1_length, this.x, this.y, p1_CanvasLength, p1_CanvasLength);
                }
                else if(attackFrame == 20) {
                    attackFrame = 0;
                    if (attackCount == attackLoop - 1) {
                        attackCount = 0;
                        isAttacking_motion = false; //공격 동작 종료
                    }

                    else {
                        attackCount++;
                    }
                }
            }
        }
            // 공격중이 아닌 경우
        else {
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

}

p1 = new MainCharacter();


class Obstacle { //장애물 클래스
    constructor() {
        this.x = 700;
        this.y = 150;//등장하는 위치
        this.width = 50;
        this.height = 150;
        this.color = 'red'
        this.healthBar = {
            color : 'yellow',
            position_x : this.x,
            position_y : this.y - 20,
            width : this.width,
            height : 10,
            healthFullCount : 3, //총 체력
            healthCurrentCount : 3 //현재 체력
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //물체가 생성될때 충돌 여부를 확인할 수 있게 '이 x좌표에 오면 충돌한걸로 알리겠다' 라는 의미
        
        var i;
        for (i = 0; i < this.width; i++) {
            collisonCheckX[this.x + i] = 1;
        }

        ctx.fillStyle = this.healthBar.color;
        if(this.healthBar.healthCurrentCount >= 0) {
            ctx.fillRect(this.healthBar.position_x, this.healthBar.position_y,
                this.healthBar.width * (this.healthBar.healthCurrentCount / this.healthBar.healthFullCount), this.healthBar.height)
        }

    } //만약 물체도 움직이는 경우도 해결 해야함
    checkAttacked(atkTimer) {//공격이 해당 물체에 가해졌는지 확인
        if ((collisonCheckX[atkTimer] == 1) && (this.x <= atkTimer && atkTimer <= this.x + this.width)) {
            this.healthBar.healthCurrentCount--;
        }

    }
}


var obstacle = new Obstacle();

var obstacle2 = new Obstacle();
obstacle2.x = 200;
obstacle2.healthBar.position_x = 200;
obstacle2.color = 'blue';

var obstacle3 = new Obstacle();
obstacle3.x = 800;
obstacle3.healthBar.position_x = 800;

var obstacle4 = new Obstacle();
obstacle4.x = 900;
obstacle4.healthBar.position_x = 900;

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
    ctx.fillRect(0, p1.y + 150, canvas.width, canvas.height);

    //충돌이 없는 경우에만 주인공의 x, y좌표 갱신

    //좌표계를 이용해 충돌 확인 
    if ((movingLeft == true && collisonCheckX[((p1.x + p1_CanvasLength / 2) - 30)] == -1) && isAttacking == false) { //왼쪽 충돌 여부 확인 후 왼쪽으로 이동
        p1.x--;
        p1.attackBox.position_x--;
    }

    if ((movingRight == true && collisonCheckX[((p1.x + p1_CanvasLength / 2) + 30)] == -1) && isAttacking == false) { //오른쪽 충돌 여부 확인 후 오른쪽으로 이동
        p1.x++;
        p1.attackBox.position_x++;
    }
    //공격 중인 경우
    if (isAttacking == true) {
         //오른쪽 공격인 경우
        if(lookingRight == true) {
            if(attackTimer >= p1.attackBox.width) {
                obstacle.checkAttacked(p1.attackBox.position_x + p1.attackBox.width);
                obstacle2.checkAttacked(p1.attackBox.position_x + p1.attackBox.width);
                obstacle3.checkAttacked(p1.attackBox.position_x + p1.attackBox.width);
                obstacle4.checkAttacked(p1.attackBox.position_x + p1.attackBox.width);
                isAttacking = false;
                attackTimer = 0;
            }
            else {
                // ctx.fillStyle = 'green';
                // ctx.fillRect(p1.attackBox.position_x, p1.attackBox.position_y, attackTimer, p1.attackBox.height);
                attackTimer++;
            }
            
        }
        //왼쪽 공격인 경우
        else if(lookingRight == false) {
            if(attackTimer >= p1.attackBox.width) {
                obstacle.checkAttacked(p1.attackBox.position_x - p1.attackBox.width);
                obstacle2.checkAttacked(p1.attackBox.position_x - p1.attackBox.width);
                obstacle3.checkAttacked(p1.attackBox.position_x - p1.attackBox.width);
                obstacle4.checkAttacked(p1.attackBox.position_x - p1.attackBox.width);
                isAttacking = false;
                attackTimer = 0;
            }
            else {
                // ctx.fillStyle = 'green';
                // ctx.fillRect(p1.attackBox.position_x - attackTimer, p1.attackBox.position_y, attackTimer, p1.attackBox.height);
                attackTimer++;
            }
        }
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

document.addEventListener('keydown', function(e) { //f키를 누를시 발생
    if (e.key === 'f') {
        isAttacking = true;
        isAttacking_motion = true;
    }
})