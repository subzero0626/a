const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const GAME_DATA_FILE = path.join(DATA_DIR, 'gameData.json');

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 데이터 디렉토리 생성
async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error('Data directory creation error:', error);
    }
}

// 파일 읽기 헬퍼
async function readJsonFile(filePath, defaultValue = []) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return defaultValue;
        }
        throw error;
    }
}

// 파일 쓰기 헬퍼
async function writeJsonFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// JWT 토큰 검증 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '토큰이 없습니다' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: '유효하지 않은 토큰입니다' });
        }
        req.user = user;
        next();
    });
}

// 초기화
async function init() {
    await ensureDataDir();
    const users = await readJsonFile(USERS_FILE, []);
    const gameData = await readJsonFile(GAME_DATA_FILE, {});
    console.log('서버 초기화 완료');
}

// ========== 인증 API ==========

// 회원가입
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요' });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ error: '아이디는 3~20자여야 합니다' });
        }

        if (password.length < 4) {
            return res.status(400).json({ error: '비밀번호는 최소 4자 이상이어야 합니다' });
        }

        const users = await readJsonFile(USERS_FILE, []);

        // 중복 체크
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: '이미 사용 중인 아이디입니다' });
        }

        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);

        // 새 사용자 추가
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeJsonFile(USERS_FILE, users);

        // 게임 데이터 초기화
        const gameData = await readJsonFile(GAME_DATA_FILE, {});
        gameData[newUser.id] = {
            storage: [],
            artifactStorage: [],
            lastArtifactDraw: 0,
            totalDraws: 0,
            rarestItem: null,
            startTime: Date.now(),
            pausedTime: 0,
            sehoDrawCount: 0,
            shopItems: [],
            shopRefreshTime: 0,
            purchasedInCurrentShop: [],
            sehoCoin: 0,
            activeBuffs: [],
            purchasedThemes: [],
            currentTheme: 'default',
            itemStorage: [],
            specialItemCount: 0,
            noCooldownCount: 0,
            nameChangedItems: [],
            usedCodes: [],
            questState: {
                lastDailyReset: 0,
                dailyQuests: [],
                eventQuests: [],
                activeTab: 'daily'
            }
        };
        await writeJsonFile(GAME_DATA_FILE, gameData);

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            message: '회원가입 성공',
            token,
            user: { id: newUser.id, username: newUser.username }
        });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다' });
    }
});

// 로그인
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요' });
        }

        const users = await readJsonFile(USERS_FILE, []);
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다' });
        }

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            message: '로그인 성공',
            token,
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다' });
    }
});

// 토큰 검증
app.get('/api/verify', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// ========== 게임 데이터 API ==========

// 게임 데이터 불러오기
app.get('/api/game-data', authenticateToken, async (req, res) => {
    try {
        const gameData = await readJsonFile(GAME_DATA_FILE, {});
        const userGameData = gameData[req.user.id] || null;
        res.json({ gameData: userGameData });
    } catch (error) {
        console.error('게임 데이터 불러오기 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다' });
    }
});

// 게임 데이터 저장
app.post('/api/game-data', authenticateToken, async (req, res) => {
    try {
        const gameData = await readJsonFile(GAME_DATA_FILE, {});
        gameData[req.user.id] = req.body;
        await writeJsonFile(GAME_DATA_FILE, gameData);
        res.json({ message: '저장 완료' });
    } catch (error) {
        console.error('게임 데이터 저장 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다' });
    }
});

// 루트 경로 - HTML 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
init().then(() => {
    app.listen(PORT, () => {
        console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
    });
});

