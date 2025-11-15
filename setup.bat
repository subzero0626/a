@echo off
echo ========================================
echo 세호로리 게임 Railway 배포 준비 스크립트
echo ========================================
echo.

echo [1/2] public/index.html 파일 생성 중...
if exist sehorory.html (
    copy sehorory.html public\index.html >nul
    echo ✓ sehorory.html을 public/index.html로 복사 완료!
) else (
    echo ✗ 오류: sehorory.html 파일을 찾을 수 없습니다!
    pause
    exit /b 1
)

echo.
echo [2/2] 파일 구조 확인 중...
if exist server.js (
    echo ✓ server.js 존재
) else (
    echo ✗ server.js 없음
)

if exist package.json (
    echo ✓ package.json 존재
) else (
    echo ✗ package.json 없음
)

if exist public\index.html (
    echo ✓ public/index.html 존재
) else (
    echo ✗ public/index.html 없음
)

echo.
echo ========================================
echo 준비 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. GitHub에 코드 업로드
echo 2. Railway에서 배포
echo.
echo 자세한 내용은 DEPLOY_GUIDE.md 파일을 참고하세요.
echo.
pause

