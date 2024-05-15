document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.style.transform = `translateX(${(-100 * index)}%)`; // 각 슬라이드를 적절한 위치로 이동
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // 다음 슬라이드로 이동
        showSlide(currentIndex);
    }

    // 자동 슬라이드 쇼 시작
    let slideInterval = setInterval(nextSlide, 3000); // 3000ms, 즉 3초마다 슬라이드 변경

    // 이전 슬라이드 이동 버튼
    document.querySelector('.prev').addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        showSlide(currentIndex);
        resetInterval(); // 사용자 입력에 의해 인터벌 리셋
    });

    // 다음 슬라이드 이동 버튼
    document.querySelector('.next').addEventListener('click', function() {
        nextSlide();
        resetInterval(); // 사용자 입력에 의해 인터벌 리셋
    });

    // 슬라이드 쇼 타이머를 리셋하는 함수
    function resetInterval() {
        clearInterval(slideInterval); // 현재 인터벌을 멈춤
        slideInterval = setInterval(nextSlide, 3000); // 새로운 인터벌 시작
    }
});


// D-Day 계산
const eventDate = new Date('May 18, 2024 13:00:00');
const dDayDisplay = document.getElementById('d-day');

function updateDday() {
    const today = new Date();
    const diff = eventDate - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    dDayDisplay.textContent = `D-${days}일`;
}

updateDday(); // 초기 D-Day 표시
setInterval(updateDday, 86400000); // 매일 업데이트

document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name-input').value;
    var message = document.getElementById('message-input').value;
    if (!name || !message) {
        alert('이름과 메시지를 입력해주세요.');
        return;
    }

    var xhr = new XMLHttpRequest();
    var url = 'https://script.google.com/macros/s/AKfycbwQ6rlebT7NSFn2dlG_QskCjtdZqg9AF4QcsWRmP5HhXZO_1Za8N2i18PIM6P_YDmX4Nw/exec';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            if (res.status === 'success') {
                displayMessage(res.name, res.message, res.timestamp);
                document.getElementById('guestbook-form').reset();
            } else {
                alert('메시지 전송 실패, 다시 시도해주세요.');
            }
        }
    };
    xhr.send('name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message));
});

function displayMessage(name, message, timestamp) {
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<h4>${name} | ${new Date(timestamp).toLocaleString()}</h4><p>${message}</p>`;
    document.getElementById('messages-container').appendChild(messageDiv);
}

// 페이지 로드 시 저장된 메시지 불러와서 표시
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
});

function loadMessages() {
    fetch('https://script.google.com/macros/s/AKfycbwQ6rlebT7NSFn2dlG_QskCjtdZqg9AF4QcsWRmP5HhXZO_1Za8N2i18PIM6P_YDmX4Nw/exec')
        .then(response => response.json())
        .then(data => {
            var messagesContainer = document.getElementById('messages-container');
            messagesContainer.innerHTML = '';
            data.forEach(row => {
                displayMessage(row.name, row.message, row.timestamp);
            });
        });
}

kakao.maps.load(function() {
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.5563, 127.0060), // Coordinates for 신라호텔 영빈관
            level: 3 // Map zoom level
        };

    var map = new kakao.maps.Map(mapContainer, mapOption); // Create map

    // Marker position
    var markerPosition  = new kakao.maps.LatLng(37.5563, 127.0060); 

    // Create marker
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    marker.setMap(map); // Display the marker on the map
});


// SDK 초기화
Kakao.init('d59123877a5163cbf1586b25970c56e2'); // 여기서 'YOUR_APP_KEY'는 카카오 개발자 포털에서 얻은 JavaScript 키입니다.

// 공유하기 함수 설정
function sendKakaoLink() {
  Kakao.Link.sendDefault({
    objectType: 'feed', // 메시지 타입
    content: {
      title: '청첩장', // 공유할 내용의 제목
      description: '당신을 결혼식에 초대합니다.', // 공유할 내용의 본문
      imageUrl: 'IMAGE_URL', // 공유할 이미지의 URL
      link: {
        mobileWebUrl: 'https://ce4297ca-9b0b-4c3e-85f2-e0d8b504eb77-00-m4zeaa68kodb.pike.replit.dev/', // 모바일에서 링크 클릭 시 이동할 URL
        webUrl: 'https://ce4297ca-9b0b-4c3e-85f2-e0d8b504eb77-00-m4zeaa68kodb.pike.replit.dev/' // PC에서 링크 클릭 시 이동할 URL
      }
    },
    buttons: [
      {
        title: '웹으로 보기', // 버튼 제목
        link: {
          mobileWebUrl: 'https://ce4297ca-9b0b-4c3e-85f2-e0d8b504eb77-00-m4zeaa68kodb.pike.replit.dev/', // 버튼 클릭 시 이동할 모바일 URL
          webUrl: 'https://ce4297ca-9b0b-4c3e-85f2-e0d8b504eb77-00-m4zeaa68kodb.pike.replit.dev/' // 버튼 클릭 시 이동할 웹 URL
        }
      }
    ]
  });
}
