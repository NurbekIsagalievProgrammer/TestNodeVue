import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let timeout: NodeJS.Timeout;

const users = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' }
];


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API! Use POST /search to query users.');
});

app.post('/search', (req: Request, res: Response) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
        const { email, number } = req.body;
        const result = users.filter(user => 
            user.email === email && 
            (!number || user.number === number)
        );
        res.json(result);
    }, 5000);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
