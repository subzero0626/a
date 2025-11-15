# 🚀 Railway 배포 완전 가이드 (초보자용)

이 가이드는 처음부터 끝까지 모든 단계를 자세히 설명합니다.

---

## 📋 준비 단계 1: 파일 준비

### 1-1. public/index.html 파일 생성

현재 `public/index.html` 파일이 비어있습니다. `sehorory.html` 파일의 내용을 복사해야 합니다.

**방법 1: 수동 복사**
1. `sehorory.html` 파일을 열기
2. 전체 내용 선택 (Ctrl+A) 후 복사 (Ctrl+C)
3. `public/index.html` 파일 열기
4. 전체 내용 붙여넣기 (Ctrl+V)
5. 저장 (Ctrl+S)

**방법 2: 명령어 사용 (터미널/CMD)**
```bash
# Windows (PowerShell)
Copy-Item sehorory.html public\index.html

# Windows (CMD)
copy sehorory.html public\index.html

# Mac/Linux
cp sehorory.html public/index.html
```

### 1-2. 파일 구조 확인

다음 파일들이 모두 있어야 합니다:

```
d:\random\
├── server.js          ✅ (서버 파일)
├── package.json       ✅ (의존성 파일)
├── .gitignore         ✅ (Git 제외 파일)
├── sehorory.html      ✅ (원본 게임 파일)
├── public/
│   └── index.html     ⚠️ (sehorory.html 복사 필요!)
└── README.md          ✅ (설명 파일)
```

---

## 📋 준비 단계 2: 로컬 테스트 (선택사항)

배포 전에 로컬에서 테스트해볼 수 있습니다.

### 2-1. Node.js 설치 확인

터미널/CMD에서 확인:
```bash
node --version
npm --version
```

**설치되어 있지 않다면:**
1. https://nodejs.org 접속
2. LTS 버전 다운로드 및 설치
3. 설치 후 터미널 재시작

### 2-2. 의존성 설치

프로젝트 폴더에서 실행:
```bash
cd d:\random
npm install
```

이 명령어는 `package.json`에 있는 패키지들을 설치합니다:
- express
- bcrypt
- jsonwebtoken
- cors

### 2-3. 서버 실행

```bash
npm start
```

**성공 메시지:**
```
서버가 포트 3000에서 실행 중입니다
```

### 2-4. 브라우저에서 테스트

1. 브라우저 열기
2. 주소창에 입력: `http://localhost:3000`
3. 로그인 화면이 나타나면 성공!

**테스트 계정 만들기:**
- 회원가입 탭 클릭
- 아이디: `test`
- 비밀번호: `1234`
- 회원가입 버튼 클릭

**중지 방법:**
- 터미널에서 `Ctrl + C` 누르기

---

## 📋 단계 1: GitHub 저장소 생성

### 1-1. GitHub 계정 만들기 (없는 경우)

1. https://github.com 접속
2. "Sign up" 클릭
3. 이메일, 비밀번호 입력
4. 이메일 인증 완료

### 1-2. 새 저장소 만들기

1. GitHub 로그인 후 우측 상단 **"+"** 버튼 클릭
2. **"New repository"** 선택
3. 저장소 설정:
   - **Repository name**: `sehorory-game` (원하는 이름)
   - **Description**: `세호로리 뽑기 게임` (선택사항)
   - **Public** 선택 (무료)
   - **"Add a README file"** 체크 해제 (이미 README.md 있음)
   - **"Add .gitignore"** 체크 해제 (이미 .gitignore 있음)
4. **"Create repository"** 버튼 클릭

### 1-3. Git 초기화 (로컬 폴더)

**Git이 설치되어 있는지 확인:**
```bash
git --version
```

**설치되어 있지 않다면:**
1. https://git-scm.com 접속
2. 다운로드 및 설치
3. 설치 시 기본 옵션으로 진행

**프로젝트 폴더에서 Git 초기화:**
```bash
cd d:\random
git init
```

### 1-4. 파일 추가 및 커밋

```bash
# 모든 파일 추가
git add .

# 커밋 메시지 작성
git commit -m "Initial commit: 세호로리 뽑기 게임 with 로그인 시스템"
```

### 1-5. GitHub에 업로드

**방법 1: HTTPS (추천 - 간단함)**

1. GitHub 저장소 페이지에서 **"Code"** 버튼 클릭
2. **HTTPS** 탭 선택
3. URL 복사 (예: `https://github.com/사용자명/sehorory-game.git`)

```bash
# 원격 저장소 연결
git remote add origin https://github.com/사용자명/sehorory-game.git

# 브랜치 이름 설정 (최신 Git 버전)
git branch -M main

# 파일 업로드
git push -u origin main
```

**GitHub 로그인 요청 시:**
- 사용자명: GitHub 사용자명 입력
- 비밀번호: **Personal Access Token** 필요 (아래 참고)

**Personal Access Token 만들기:**
1. GitHub → 우측 상단 프로필 → **Settings**
2. 왼쪽 메뉴 맨 아래 **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. 설정:
   - **Note**: `Railway Deploy`
   - **Expiration**: 원하는 기간 (90일 권장)
   - **Scopes**: `repo` 체크
6. **Generate token** 클릭
7. **토큰 복사** (한 번만 보여줌!)
8. 비밀번호 입력 시 이 토큰 사용

**방법 2: GitHub Desktop (GUI 사용)**

1. https://desktop.github.com 다운로드
2. 설치 후 로그인
3. **File** → **Add Local Repository**
4. `d:\random` 폴더 선택
5. **Publish repository** 클릭
6. 저장소 이름 입력 후 **Publish** 클릭

---

## 📋 단계 2: Railway 가입 및 프로젝트 생성

### 2-1. Railway 가입

1. https://railway.app 접속
2. **"Start a New Project"** 또는 **"Login"** 클릭
3. **"Login with GitHub"** 클릭
4. GitHub 계정으로 로그인
5. Railway 권한 승인

### 2-2. 새 프로젝트 생성

1. Railway 대시보드에서 **"New Project"** 클릭
2. **"Deploy from GitHub repo"** 선택
3. GitHub 저장소 목록에서 `sehorory-game` 선택
4. **"Deploy Now"** 클릭

### 2-3. 배포 대기

Railway가 자동으로:
- 코드 다운로드
- `npm install` 실행
- `npm start` 실행

**배포 상태 확인:**
- 대시보드에서 **"Deployments"** 탭 확인
- 초록색 체크 표시 = 성공
- 빨간색 X 표시 = 실패 (로그 확인 필요)

**예상 소요 시간:** 2-5분

---

## 📋 단계 3: 환경 변수 설정 (보안 강화)

### 3-1. JWT_SECRET 생성

JWT 토큰 암호화를 위한 비밀키를 설정합니다.

**랜덤 문자열 생성 방법:**

**방법 1: 온라인 생성기**
1. https://randomkeygen.com 접속
2. **"CodeIgniter Encryption Keys"** 섹션에서 하나 복사

**방법 2: Node.js로 생성**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**방법 3: 간단한 문자열 (테스트용)**
```
my-super-secret-jwt-key-2024-change-this
```

### 3-2. Railway에 환경 변수 추가

1. Railway 프로젝트 대시보드에서 **"Variables"** 탭 클릭
2. **"+ New Variable"** 클릭
3. 입력:
   - **Key**: `JWT_SECRET`
   - **Value**: 위에서 생성한 랜덤 문자열
4. **"Add"** 클릭
5. **자동으로 재배포됨** (몇 분 소요)

---

## 📋 단계 4: 도메인 설정 및 접속

### 4-1. Railway 도메인 확인

1. Railway 프로젝트 대시보드에서 **"Settings"** 탭 클릭
2. **"Networking"** 섹션 확인
3. **"Generate Domain"** 클릭 (아직 없다면)
4. 도메인 주소 복사 (예: `sehorory-game-production.up.railway.app`)

### 4-2. 브라우저에서 접속

1. 브라우저 열기
2. 주소창에 Railway 도메인 입력
3. 엔터 키 누르기
4. 로그인 화면이 나타나면 성공! 🎉

### 4-3. 테스트 계정 만들기

1. **"회원가입"** 탭 클릭
2. 아이디 입력 (예: `testuser`)
3. 비밀번호 입력 (예: `test1234`)
4. **"회원가입"** 버튼 클릭
5. 자동으로 로그인되고 게임 화면 표시됨

---

## 📋 단계 5: 문제 해결 (Troubleshooting)

### 문제 1: 배포 실패

**확인 사항:**
1. `public/index.html` 파일이 있는지 확인
2. `package.json`에 `start` 스크립트가 있는지 확인
3. Railway 로그 확인:
   - 프로젝트 → **"Deployments"** → 실패한 배포 클릭 → **"View Logs"**

**일반적인 오류:**
- `Cannot find module`: `npm install`이 제대로 실행되지 않음
- `EADDRINUSE`: 포트 충돌 (Railway가 자동 처리)
- `ENOENT`: 파일 경로 오류

### 문제 2: 로그인 화면이 안 나타남

**확인 사항:**
1. 브라우저 콘솔 확인 (F12 → Console 탭)
2. 네트워크 탭에서 API 요청 확인
3. `server.js`의 `API_BASE_URL`이 올바른지 확인

### 문제 3: 데이터가 저장되지 않음

**확인 사항:**
1. Railway에서 `data/` 폴더 권한 확인
2. 로그인 상태 확인 (토큰이 있는지)
3. 서버 로그에서 에러 확인

### 문제 4: 재배포 방법

코드를 수정한 후:

```bash
cd d:\random
git add .
git commit -m "업데이트 내용"
git push
```

Railway가 자동으로 재배포합니다.

---

## 📋 단계 6: 추가 설정 (선택사항)

### 6-1. 커스텀 도메인 연결

1. Railway 프로젝트 → **Settings** → **Networking**
2. **"Custom Domain"** 섹션
3. 도메인 입력 (예: `game.example.com`)
4. DNS 설정:
   - 도메인 제공업체에서 CNAME 레코드 추가
   - Host: `game`
   - Value: Railway 도메인

### 6-2. 데이터베이스 추가 (나중에)

Railway는 PostgreSQL, MySQL 등을 제공합니다.
- 프로젝트 → **"+ New"** → **"Database"** 선택

### 6-3. 환경 변수 추가

**추가할 수 있는 환경 변수:**
- `NODE_ENV=production` (프로덕션 모드)
- `LOG_LEVEL=info` (로깅 레벨)

---

## ✅ 체크리스트

배포 전 확인:

- [ ] `public/index.html` 파일이 `sehorory.html` 내용으로 채워져 있음
- [ ] 모든 파일이 GitHub에 업로드됨
- [ ] Railway 프로젝트가 생성되고 배포됨
- [ ] 환경 변수 `JWT_SECRET` 설정됨
- [ ] 브라우저에서 접속 가능
- [ ] 회원가입/로그인 작동
- [ ] 게임 데이터 저장/불러오기 작동

---

## 🎉 완료!

축하합니다! 이제 세호로리 뽑기 게임이 온라인에서 실행됩니다!

**다음 단계:**
- 친구들에게 링크 공유
- 게임 기능 추가
- 데이터베이스로 업그레이드
- 커스텀 도메인 연결

---

## 📞 도움이 필요하면

- Railway 문서: https://docs.railway.app
- GitHub 문서: https://docs.github.com
- 문제 발생 시 Railway 로그 확인

