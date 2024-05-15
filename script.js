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


function shareLink() {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('링크가 클립보드에 복사되었습니다.');
}

function shareKakao() {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '모바일 청첩장',
            description: '신랑 김수현 & 신부 김지원',
            imageUrl: 'wedding-photo.jpg',  // 공유할 이미지의 URL
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        }
    });
}
const KAKAOTALK_API_TOKEN = 'd59123877a5163cbf1586b25970c56e2';
const KAKAOTALK_SHARE_IMAGE = 'https://example.com/path_to_your_image.jpg';
const WEDDING_INVITATION_URL = 'https://example.com/your_invitation_page';
const GROOM_NAME = '김이현';
const BRIDE_NAME = '김이나';

kakao.Link.createDefaultButton({
  objectType: "feed",
  container: "#sendKakao",
  content: {
    title: `${김이현}❤${김이나} 결혼식에 초대합니다`,
    description: "아래의 '청첩장 열기' 버튼을 눌러 읽어주세요🤵👰",
    imageUrl: KAKAOTALK_SHARE_IMAGE,
    link: {
      mobileWebUrl: https://yuna2121.github.io/wedding1/,
      webUrl: https://yuna2121.github.io/wedding1/,
    },
  },
  buttons: [
    {
      title: "청첩장 열기",
      link: {
        mobileWebUrl:https://yuna2121.github.io/wedding1/,
        webUrl: https://yuna2121.github.io/wedding1/,
      },
    },
  ],
  installTalk: true,
});

