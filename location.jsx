import React, { useEffect } from 'react';
import styled from 'styled-components';

const Map = styled.div`
  width: 100%;
  height: 360px; // 지도 높이 지정
  margin-top: -20px; // 지도와 상단 내용의 간격 조정
`;

const Wrapper = styled.div` // 스타일 컴포넌트 추가 설정
  margin: 20px;
  padding: 20px;
  background: #fff; // 배경색 추가
  box-shadow: 0 0 10px rgba(0,0,0,0.1); // 박스 그림자 추가
`;

const Title = styled.h2` // 제목 스타일
  font-size: 20px;
  margin-bottom: 16px;
`;

const Content = styled.div` // 내용 스타일
  font-size: 16px;
`;

const Location = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
    script.charset = 'UTF-8';
    script.onload = () => {
      new window.daum.roughmap.Lander({
        "timestamp": "1715763488690",
        "key": "2jccg",
        "mapWidth": "640",
        "mapHeight": "360"
      }).render();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Wrapper>
      <Title>오시는 길</Title>
      <Map id="daumRoughmapContainer1715763488690" className="root_daum_roughmap root_daum_roughmap_landing" />
      <Content>
        신라호텔 영빈관
        <br />
        서울특별시 중구 장충단로 249
      </Content>
    </Wrapper>
  );
};

export default Location;
