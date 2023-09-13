# Data-visualization Project

## 프로젝트 소개
<img width="1440" alt="프로젝트 이미지" src="https://github.com/Chaam2/data-visualization/assets/126763111/1b45387b-e287-4072-9992-eb6ecd8137c6">

🌐 [**배포 사이트 바로가기**](https://data-visualization-silk.vercel.app/)

리액트와 차트 라이브러리를 활용하여 json 데이터를 차트로 시각화 하였습니다.


## 개발 환경

### Development

<img src= "https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/recharts-FF6384?style=for-the-badge">

### Styling

<img src="https://img.shields.io/badge/tailwind Css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

## 실행 방법
```
$ git clone https://github.com/Chaam2/data-visualization.git

$ npm install

$ npm run dev
```
## 디렉토리 구조

```
📦src
 ┣ 📂@types
 ┣ 📂api
 ┃ ┗ 📜getChartData.ts
 ┣ 📂components
 ┃ ┣ 📜Chart.tsx
 ┃ ┣ 📜CustomTooltip.tsx
 ┃ ┗ 📜FilterButtons.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useChartData.ts
 ┣ 📂pages
 ┃ ┗ 📜ChartPage.tsx
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```

## Assignment별 구현 방식
### 시계열 차트 만들기
> 차트 라이브러리로 `recharts`와 `react-chartjs-2`중 
더 최근까지 업데이트가 되었고 주간 다운로드 수가 더 높은 recharts라이브러리를 선택하였습니다. 또 비교적 recharts가 더 리액트 컴포넌트 형식에 최적화되어있다고 느꼈습니다.

- recharts에서 요구하는 데이터의 형식에 맞게 response로 받은 데이터를 변환하였습니다.
  ```ts
  const convertedData =
      responseData &&
      Object.entries(responseData).map(([time, data]) => {
        const formattedDate = dayjs(time).format('YYYY.MM.DD');
        const formattedTime = dayjs(time).format('hh:mm:ss');
        return {
          date: formattedDate,
          time: formattedTime,
          id: data.id,
          value_area: data.value_area,
          value_bar: data.value_bar,
        };
      });
  ```
### 호버 기능 구현
- recharts의 customTooltip을 활용 해 특정 구역에 마우스 호버시 해당 데이터를 확인 할 수 있게 구현하였습니다.

### 필터링 기능 구현
- 필터링 버튼을 생성하기 위해 중복되지 않은 value값으로 이뤄진 유사객체를 리턴하는 `new Set()`메서드를 활용하였습니다.
  ```ts
  const uniqueIdsSet = new Set(chartData && chartData.map((data) => data.id));
  const ids = [...uniqueIdsSet];
  ```
- 브라우저 새로고침시에도 필터링이 유지될 수 있도록  react-router-dom의 useSearchParams hook을 활용하였습니다.<br> 지역 id 버튼 클릭 시 해당 id로 url parameter를 설정하고, url param값에 따라 css스타일링(하이라이트)을 주는 방식으로 구현하였습니다.
