import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();


app.set('port', process.env.PORT || 3008);
app.set('trust proxy', '127.0.0.1');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(cookieParser())

app.use(passport.initialize());


// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('public', { ignore: ['favicon.ico'] }));
app.use('/editor', express.static(path.join(__dirname, 'public/uploads/editor')));
app.use('/img', express.static(path.join(__dirname, 'public/uploads/img')));
app.use('/profile', express.static(path.join(__dirname, 'public/uploads/profile')));



app.enable('trust proxy');


app.get('/', (req, res) => {
    const subdomain = req.get('host').split('.')[0];
    console.log(req.get('host'));
    console.log(subdomain);
    console.log(req.query);
    res.send(`서브도메인 ${subdomain}을 처리합니다.`);
})



app.get('/chkserver', (req, res) => {
    res.send('서버 생성 완료!!!!')
})


app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`server running in port ${app.get('port')}`);
})