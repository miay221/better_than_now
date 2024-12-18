document.addEventListener("DOMContentLoaded", () => {
    // Matter.js 모듈 가져오기
    const { Engine, Render, Runner, Bodies, Composite, World, Events } = Matter;
    const balloon = document.getElementById('balloon');
    const userBalloon = document.getElementById('userBalloon');
    const fallingContainer = document.getElementById('fallingContainer');

    // 텍스트박스 자동 높이 조절
    textBox.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
    });

    // 물리 엔진 생성
    const engine = Engine.create();
    const world = engine.world;

    // 렌더러 생성
    const render = Render.create({
        element: fallingContainer,
        engine: engine,
        options: {
            width: 500,
            height: 570,
            wireframes: false, // 원이 채워진 상태로 보이도록 설정
            background: '#ffffff'
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 바닥 추가 (원들이 쌓이는 곳)
    const ground = Bodies.rectangle(240, 560, 480, 2, {
        isStatic: true,
        render: { visible: false }
    });
    World.add(world, ground);

    // 원 생성 함수
    function createCircle(x, y, radius, label) {
        return Bodies.circle(x, y, radius, {
            restitution: 0.6, // 반발력 설정
            friction: 3, // 마찰 설정
            frictionAir: 0.01,
            render: {
                fillStyle: `hsl(${Math.floor(Math.random() * 360)}, 80%, 50%)` // 색상 랜덤 설정
            },
            label: label // 원의 글자 라벨 설정
        });
    }

    // 여러 원 추가
    const labels = ['M', 'I', 'N', 'I', 'M', 'E'];
    let currentIndex = 0;

    // 풍선 표시 애니메이션
    setTimeout(() => {
        balloon.classList.add('visible');
    }, 3000); // 페이지 로드 후 3초 후 표시하기

    setTimeout(() => {
        userBalloon.classList.add('visible');
    }, 5000); // 페이지 로드 후 5초 후 표시하기

    // 원 생성 반복
    setInterval(() => {
        const label = labels[currentIndex % labels.length]; // 라벨 순환
        const randomX = Math.random() * 400 + 40; // 랜덤 x 위치
        const circle = createCircle(randomX, 0, 32, label); // 원 생성
        World.add(world, circle);

        currentIndex++; // 다음 라벨로 이동
    }, 1300); // 1.3초 간격으로 원이 떨어지도록 설정

    // 충돌 이벤트 로깅 (사용자 정의 동작 추가 가능)
    Events.on(engine, 'collisionStart', (event) => {
        event.pairs.forEach(pair => {
            // 충돌 시 동작
        });
    });
});
