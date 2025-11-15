# 세호로리 뽑기 게임

Railway에 배포하기 위한 설정 가이드입니다.

## 🚀 빠른 시작

**5분 안에 배포하기:**
1. `QUICK_START.md` 파일 읽기 (간단한 요약)
2. `DEPLOY_GUIDE.md` 파일 읽기 (상세한 설명)

## 📋 배포 방법 요약

1. **파일 준비**
   - `setup.bat` (Windows) 또는 `setup.sh` (Mac/Linux) 실행
   - 또는 수동으로: `sehorory.html` → `public/index.html` 복사

2. **GitHub에 코드 업로드**
   - Git 저장소 초기화 및 푸시

3. **Railway 배포**
   - https://railway.app 접속
   - GitHub 저장소 연결
   - 자동 배포

4. **환경 변수 설정**
   - `JWT_SECRET` 추가 (보안 강화)

5. **완료!**
   - Railway 도메인으로 접속

## 로컬 테스트

```bash
npm install
npm start
```

서버가 http://localhost:3000 에서 실행됩니다.

## 파일 구조

- `server.js` - Express 서버 (로그인 API, 게임 데이터 저장)
- `package.json` - Node.js 의존성
- `public/index.html` - 게임 HTML 파일 (sehorory.html을 public/index.html로 복사 필요)

## 주의사항

- `sehorory.html` 파일을 `public/index.html`로 복사해야 합니다.
- Railway는 자동으로 `PORT` 환경 변수를 설정합니다.
- 데이터는 `data/` 폴더에 JSON 파일로 저장됩니다.

