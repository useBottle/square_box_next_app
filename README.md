# Square Box (Next.js)

<br />
<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbqkSh3%2FbtsLUrksnEL%2F9xfkckhRCcbLm600xOGAP1%2Fimg.png" width="200px" /></p>

<br />
<br />
<br />

## 프로젝트 소개
- Square Box 는 사용자가 뉴스, 유튜브 컨텐츠를 검색하고 저장하고 싶은 컨텐츠는 북마크할 수 있는 애플리케이션입니다. 
- 기존의 React 로 개발했던 프로젝트를 Next.js 를 사용해 다시 개발하면서 사용 성능 개선 및 리디자인하였습니다.

<br />
<br />
<br />

## 개발 목적
- 기존 React 프로젝트보다 더 빠른 컨텐츠 검색 속도
- 더 나은 UI 디자인
- 새로운 기술 학습 및 연습

<br />
<br />
<br />

## 개발 기간 / 인원
- 개발 기간 - 24.09.18 ~ 25.01.24 (실 개발 기간 약 3개월)
- 개발 인원 - 1명 (정병호)

<br />
<br />
<br />

## 기존 프로젝트 대비 개선 사항

#### 기능적 측면
- 전통적인 ID, PW 로 회원 가입 및 로그인하는 방식에서 SNS 로그인 방식 추가.
- 새로 검색하여 접속한 컨텐츠가 기존에 북마크 했던 컨텐츠라면 북마크 버튼이 북마크된 상태로 표시되도록 UX 개선.
- 모바일 접속 유저를 포커스로 하여 모바일 퍼스트 디자인으로 UI 디자인. (모바일 친화 UI)

<br />

#### 기술적 측면
- NextAuth.js 를 사용하여 좀 더 직관적이고 효율적으로 회원 가입 및 로그인 로직 개발.
- Redux Thunk 미들웨어를 적용해 프로미스 결과에 따른 상태 업데이트하는 패턴 추가 적용.
- 좀 더 유연한 스타일 코드 적용 및 향후 신규 기능 추가 시 동적인 스타일링을 대비해 Emotion 채용.
- Next.js 의 다이나믹 라우트를 통한 효율적인 상세 페이지 컴포넌트 생성.
- 뉴스 및 유튜브 컨텐츠 요청 로직을 각각 분리, 컨텐츠 리스트 요청과 개별 컨텐츠 요청 로직을 분리하여 서버에서 데이터 처리 후 응답하는 시간을 단계적으로 나누어 사용자 체감 로딩 시간을 최대한 단축
- ISR 을 적용해 실시간 검색어, 최신 뉴스 리스트 데이터를 서버에서 주기적으로 재검증 및 최신화 하도록 하여 애플리케이션 초기 로딩 속도를 단축.

<br />
<br />
<br />

## 배포 주소
https://square-box-next-app.vercel.app/

<br />
<br />
<br />

## 사용 기술
#### Front-end
- Next.js
- TypeScript
- Redux-toolkit
- Emotion
- NextAuth

#### Back-end
- Node.js
- TypeScript
- Mongoose
- MongoDB

#### Config
- Yarn
- Vercel

<br />
<br />
<br />

## 주요 페이지 구성 및 기능

<br />
<br />
<br />

현재 웹 접속 기기 비율이 모바일 유저가 훨씬 많다는 점을 고려해 모바일 친화 디자인을 적용하기 위해 노력했으며 아래 각 페이지에 대한 설명의 이미지 또한 모바일 뷰 이미지를 중심으로 사용했습니다.

<br />
<br />
<br />

### Home

<br />

<!-- <p align="center"><img src="" width="300px" /></p> -->

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPsEQP%2FbtsLVgP52cP%2Fggw3QkzpaNplDbWCRtGSzK%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbnlrBr%2FbtsLWaBAWbI%2F93I35e8VkVKf6sfBXC3XMK%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- 실시간 검색어 10 순위를 제공합니다.
- 실시간 검색어의 랭크 상승, 하락, 유지, 신규 등의 상태가 표시됩니다.
- 실시간 검색어를 클릭하면 뉴스 컨텐츠 제공 페이지 (/news) 로 이동하여 검색된 관련 컨텐츠를 제공합니다.
- 실시간 검색어를 통한 데이터 요청 시간을 단축하기 위해 유튜브 데이터 검색이 동시에 이루어지던 것은 제거하고 뉴스 컨텐츠만 요청되도록 변경하였습니다.
- 최신 뉴스 리스트는 기존 프로젝트에는 없던 신규로 추가한 컨텐츠입니다.
- 실시간 검색어 및 최신 뉴스 리스트 데이터는 ISR 을 적용해 애플리케이션 초기 접속 시 빌드 타임에 재검증된 최신 데이터를 불러와 렌더링하며 이후는 클라이언트 측의 백그라운드 컴포넌트에서 주기적으로 서버로부터 최신 데이터를 재요청하여 받아와 스토어에 업데이트하고 리렌더링합니다.

<br />
<br />
<br />

### Sign in / up

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fy1XGF%2FbtsLUfEDXVw%2FwRqdO8DqgijEzzz4CU7Z50%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNN6ya%2FbtsLUuuQNDo%2FcG0x5qK4N5ml3aNPBuVFBK%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- NextAuth.js 를 사용하여 좀 더 직관적이고 편리하게 개발을 진행하였고 SNS 로그인 기능을 추가하였습니다.
- 대부분의 컨텐츠는 로그인 없이 이용할 수 있지만 북마크 기능은 로그인을 해야 이용할 수 있도록 했습니다.

<br />
<br />
<br />

### News

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtU037%2FbtsLUvtI11w%2FU8UoszHlMLyvkDdKK1GJw0%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1ZoVb%2FbtsLVDxuMM7%2F09wlKCqDxIKpA1rff6t1r1%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- 사용자가 검색한 뉴스 기사들을 볼 수 있습니다. 실시간 검색어를 클릭하면 이곳으로 리디렉션되어 관련 컨텐츠가 보여집니다.
- 로그인을 했을 경우 북마크 버튼을 클릭하면 컨텐츠를 북마크하여 북마크 페이지에서 다시 볼 수 있습니다.
- 뉴스 기사 페이지는 Next.js 의 다이나믹 라우트 기능을 이용하여 하나의 컴포넌트에서 여러 컨텐츠를 동적으로 렌더링할 수 있도록 하였습니다.
- 검색해서 접속한 컨텐츠를 북마크한 경우 해당 컨텐츠를 다시 검색해 재접속 했을 때 북마크가 되어 있다는 것을 알 수 있도록 북마크 버튼의 UI 가 변경된 것으로 처음부터 렌더링되도록 하였습니다. 기존 프로젝트에서는 북마크를 해도 버튼의 UI 가 변하지 않았습니다.

<br />
<br />
<br />

### Youtube

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSwhTF%2FbtsLVHT5r3H%2FjAbnmHntZax9EUgitmyO7K%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjPPuL%2FbtsLUoH9icK%2FdDKLxUFnqbx6IOk0gwcWg1%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- 사용자가 검색한 유튜브 동영상들을 볼 수 있습니다.
- 다이나믹 라우트 및 북마크 기능과 북마크 버튼에 대한 내용은 뉴스 컨텐츠 페이지와 동일하게 적용하였습니다.

<br />
<br />
<br />

### Bookmark

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCKTJZ%2FbtsLWyoKiLP%2FQTv3W7J3c65wQ1ZGgKpquK%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- 뉴스, 유튜브 페이지에서 북마크한 컨텐츠들을 볼 수 있습니다.
- 페이지 접속 시 백그라운드에서 데이터 요청 목적의 별도의 클라이언트 컴포넌트를 사용해 미리 유저의 북마크 데이터를 DB 로부터 받아오도록 하여 북마크 페이지 접속 시 로딩 속도를 단축하도록 하였습니다.

<br />
<br />
<br />

### Skeleton UI

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcFLWCY%2FbtsLWt11CB7%2F2GKxT8taBby4hkTTv9LNKk%2Fimg.png" width="300px" /></p>

<br />
<br />
<br />

- 사용자가 검색 요청을 한 경우 데이터가 완전히 로딩되기 전까지 Skeleton UI 컴포넌트가 렌더링 되도록 적용하였습니다.
- 웹 스크래핑을 통해 데이터를 가져오기 때문에 유튜브 보다 상대적으로 데이터 응답 속도가 느린 뉴스 컨텐츠 검색 및 상세 페이지에만 적용하였습니다.

<br />
<br />
<br />

### 성능 지표 비교

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCU3Tc%2FbtsLWuzSJCo%2FkbSnkVvaaCdxMAt9lsAi11%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbc3SF6%2FbtsLV9vVC6Q%2FJSKkxKKPqXrekk6vPjhBg0%2Fimg.png" width="335px" /></p>

<br />
<br />
<br />

- SEO 향상을 위해 뉴스 및 유튜브 상세 페이지의 URL 은 쿼리 스트링으로 title 값을 포함하도록 하였고 이에 따라 해당 페이지에서는 시멘틱 태그 사용에 좀 더 신경을 썼고 애플리케이션 전체적으로 반응형 웹 적용에도 좀 더 개선하고자 노력하였습니다.
- 그에 따른 결과로 기존 프로젝트보다 접근성 및 표준 권장사항 수치가 향상되었습니다.
- Lighthouse 지표 외에 실질적으로 사용자가 특정 컨텐츠를 검색 시 데이터 로딩 시간을 단축하기 위해 로직을 분할 하는 등의 노력을 한 결과, 기존 리액트 프로젝트에서는 평균 16초에서 20초 가까이 소요되던 컨텐츠 로딩 시간이 평균 3초에서 6초 정도로 단축되었습니다.

<br />
<br />
<br />

### 반응형 웹

<br />

#### 태블릿 뷰 / 데스크탑 뷰

<br />

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlwUVw%2FbtsLV2Q9cGi%2Fucyu4QFqNRazGyKqMUeuFk%2Fimg.png" width="300px" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBBEEZ%2FbtsLWuGDNp9%2FlimQP8K66rJwCEmuNoBbq1%2Fimg.png" width="500px" /></p>

<br />
<br />
<br />

- 기존 프로젝트와 달리 모바일 퍼스트 디자인 방식으로 반응형 웹을 설계하였습니다.
- 각 기기에서 볼 때 전체적인 UI 는 비슷하지만 세부적인 UI 요소들이 해당 뷰포트에서 좀 더 나은 UX 를 제공하도록 고려하여 반응형이 적용되도록 하였습니다.
- 데스크탑 뷰에서는 뷰포트의 너비가 매우 큰 만큼 너비를 일정량 제한하여 사용자의 시선이 화면 전체로 너무 분산되지 않고 컨텐츠에 집중되도록 하였습니다.

<br />
<br />
<br />

## 추후 개선할 것

<br />

- 이메일 인증 기능 도입하여 실제 사용 가능한 이메일 주소만으로 회원 가입 하도록 적용.
- 북마크 페이지에 필터 기능 도입하여 컨텐츠를 가나다순, 날짜순 등으로 필터링하여 볼 수 있도록 적용.
- 검색 바에 이전 검색 기록 목록을 도입해 사용자가 이전 검색 기록을 확인하고 필요 시 다시 검색하도록 적용.
- 기존 프로젝트와 같이 다크모드 적용.
- 실시간 검색어 컴포넌트에서 신규 데이터로 업데이트 시 업데이트 되는 애니메이션을 추가 적용하여 UI/UX 향상.
- 뉴스 검색 페이지에서 무한 스크롤 기능 도입하여 사용자에게 더 많은 컨텐츠를 제공할 수 있도록 적용.


<br />
<br />
<br />