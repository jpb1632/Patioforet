# 힐스테이트 양주옥정 파티오포레 랜딩페이지

힐스테이트 양주옥정 파티오포레 랜딩페이지 저장소입니다.  
현재 GitHub Pages로 배포 중인 정적 사이트를 관리하고 있습니다.

## 운영 주소

- https://jpb1632.github.io/Patioforet/

## 기술 스택

- HTML
- CSS
- Vanilla JavaScript
- Gulp
- GitHub Pages
- Google Apps Script
- Kakao RoughMap
- Swiper

## 구성 방식

- 정적 랜딩페이지는 GitHub Pages로 배포
- 루트 `index.html`에서 iframe으로 실제 운영 페이지 연결
- 상담 폼 데이터 접수는 Google Apps Script webhook으로 처리
- 별도 유료 서버나 별도 백엔드 인프라 없이 운영 가능한 구조로 구성
- 무료 또는 저비용으로 운영 가능한 서비스 중심으로 조합

## 주요 기능

- 메인 히어로 슬라이더와 드래그/스와이프 인터랙션
- 메인 팝업과 `오늘하루 열지않기` 처리
- `#consultation` 및 `?consultation=1` 유입 시 상담 영역 자동 이동
- 헤더 방문예약 버튼과 하단 빠른 상담 바
- 일반 상담폼
- YouTube 홍보 영상과 Swiper 이미지 슬라이더
- 메뉴 상세 페이지 제공
- 타입안내의 2단계 variant 탭(타입 그룹/세부 타입)
- 운영 경로에 Google Analytics, Microsoft Clarity, Statcounter 연동
- Open Graph, Twitter 메타 태그 적용
- favicon 적용
- 카카오 지도 연동

## Google Apps Script 사용 방식

- 프론트엔드에서 상담 폼 데이터를 payload 형태로 정리한 뒤 Google Apps Script `exec` URL로 전송
- webhook URL은 전역 변수, meta 태그, 기본값 순으로 확인하도록 구성
- 별도 서버를 두지 않고 상담 접수 흐름을 연결할 수 있도록 구성
- GitHub Pages와 함께 사용해 배포와 운영 비용을 낮추는 방향으로 구현

## 상담 폼 처리 로직

- 메인 상담폼과 하단 빠른 상담 바를 같은 Google Apps Script 전송 흐름으로 처리
- webhook URL은 전역 변수, meta 태그, 기본값 순으로 확인
- `https://script.google.com` 호스트만 전송 허용
- 이름은 한글 또는 영문만 입력 가능
- 휴대폰 번호는 `010`으로 시작하는 11자리 숫자만 입력 가능
- 개인정보 수집/이용 동의 여부 확인
- 일반 상담폼은 상담 목적 최소 1개 선택 필요
- 입력값 sanitize 처리 후 전송
- 서버 응답 코드에 따라 중복 요청, 과다 요청, 스팸 차단, 메일 발송 한도 초과 메시지 처리

## 비동기 및 로딩 처리

- `lead-submit.js`는 필요 시 동적으로 로드해 상담 전송 로직을 분리
- 상담 데이터 전송은 `fetch`와 `async/await` 기반으로 처리
- 카카오 지도는 Promise 기반 loader로 필요 시 스크립트를 불러오고 실패 시 fallback 표시
- YouTube iframe과 주요 이미지에는 lazy loading, `decoding="async"`를 적용
- `IntersectionObserver` 기반으로 섹션 reveal 애니메이션을 처리해 초기 렌더 부담을 줄이는 방향으로 구성

## 운영 분석

- 메뉴 상세 페이지 기준으로 Google Analytics를 연동해 기본 방문 흐름을 확인할 수 있도록 구성
- Microsoft Clarity를 연결해 사용자 행동 흐름과 클릭 패턴을 확인할 수 있도록 구성
- Statcounter를 함께 연결해 보조적인 방문 통계를 확인할 수 있도록 구성

## 메뉴 페이지 및 기타 처리

- `group`, `tab`, `variant` 쿼리스트링 기반으로 페이지 상태 관리
- 잘못된 파라미터가 들어오면 기본값으로 보정
- 타입안내는 `84C`, `84I`, `84L` 그룹과 세부 타입 탭을 함께 지원
- variant 변경 시 `history.replaceState`로 URL 동기화
- 메뉴 상세는 이미지 row/stack/layout 조합 렌더링 지원
- 상세 정보 테이블과 안내 문구 렌더링 시 HTML escape 처리
- 카카오 지도 스크립트 로드 실패 시 placeholder 표시
- 상담 유입 시 메인 팝업을 생략하고 바로 상담 영역으로 이동
- 입력 요소를 제외하고 우클릭, 복사, 드래그, 일부 개발자 도구 단축키를 제한하는 기본 콘텐츠 보호 로직 적용

## 주요 파일

- `index.html`: GitHub Pages 루트 진입 파일과 상담 영역 이동 처리
- `static/프로젝트/부동산 (oLWSmCRkmlw6kEpt)/첫페이지 (AdKpMlw6KePt)/첫페이지 (AdKpMlw6KePt).html`: 현재 운영 페이지
- `static/프로젝트/부동산 (oLWSmCRkmlw6kEpt)/첫페이지 (AdKpMlw6KePt)/style.js`: 메인 페이지 인터랙션, 상담 이동, 팝업/슬라이더 처리
- `static/프로젝트/부동산 (oLWSmCRkmlw6kEpt)/첫페이지 (AdKpMlw6KePt)/lead-submit.js`: 상담폼 검증 및 전송 로직
- `static/프로젝트/부동산 (oLWSmCRkmlw6kEpt)/첫페이지 (AdKpMlw6KePt)/menu-page.js`: 메뉴 상세 페이지 렌더링 로직
- `gulpfile.mjs`: 정적 산출물 생성 및 미리보기 스크립트

## 배포 메모

- GitHub Pages는 `main` 브랜치 `/(root)` 기준으로 배포
- 루트 진입 파일은 `index.html`
- 실제 운영 페이지는 `index.html` 안의 iframe으로 연결
- 현재 운영 기준 경로는 `static/프로젝트/부동산 (oLWSmCRkmlw6kEpt)/첫페이지 (AdKpMlw6KePt)/첫페이지 (AdKpMlw6KePt).html`
