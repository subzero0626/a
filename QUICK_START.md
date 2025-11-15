# ⚡ 빠른 시작 가이드

## 🎯 5분 안에 배포하기

### 1단계: 파일 준비 (30초)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

또는 수동으로:
```bash
copy sehorory.html public\index.html    # Windows
cp sehorory.html public/index.html      # Mac/Linux
```

### 2단계: GitHub 업로드 (2분)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

### 3단계: Railway 배포 (2분)

1. https://railway.app 접속
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택
4. 배포 완료 대기

### 4단계: 환경 변수 설정 (30초)

1. Railway 프로젝트 → "Variables"
2. `JWT_SECRET` 추가 (랜덤 문자열)
3. 자동 재배포됨

### 5단계: 접속 테스트

Railway에서 제공하는 도메인으로 접속!

---

## 📚 자세한 설명이 필요하면

→ `DEPLOY_GUIDE.md` 파일을 읽어보세요!

