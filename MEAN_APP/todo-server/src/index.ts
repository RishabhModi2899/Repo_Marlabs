import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on(
    'error', console.error.bind(console, 'Connection error:')
);
db.once(
    'open', () => {
        console.log('Connected to MongoDB')
    }
);

interface toDo extends mongoose.Document {
    title: string;
    description: string;
}

const toDoSchema = new mongoose.Schema<toDo>({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const toDo = mongoose.model<toDo>('ToDo', toDoSchema);

app.get('/todos', async (req: Request, res: Response) => {
    try {
        const todos = await toDo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/todos', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTodo = new toDo({ title, description });

    try {
        const saveTodo = await newTodo.save();
        res.json(saveTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete(`/todos/:id`, async (req: Request, res: Response) => {
    try {
        const removedTodo = await toDo.findByIdAndDelete(req.params.id);
        res.json(removedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
