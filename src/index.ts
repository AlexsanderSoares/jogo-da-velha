import express from 'express';
import { createMatchController } from './application/useCases/CreateMatch';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.send("OK");
});

app.post('/match', async (req, res) => {
    const response = await createMatchController.handle(req.body.roomId);

    return res.send(response);
});

app.listen(3333, () => console.log("Server is running on port 3333"));