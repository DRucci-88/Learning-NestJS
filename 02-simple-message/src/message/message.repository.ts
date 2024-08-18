import { readFile, writeFile } from "fs/promises";

export class MessageRepository {

    private readonly nameFile: string = 'messages.json';

    async findOne(id: string) {
        const contents = await readFile(this.nameFile, 'utf-8');
        const messages = JSON.parse(contents);

        return messages[id];
    }

    async findAll() {
        const contents = await readFile(this.nameFile, 'utf-8');
        const messages = JSON.parse(contents);

        return messages;
    }

    async create(content: string): Promise<number> {
        const contents = await readFile(this.nameFile, 'utf-8');
        const messages = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);
        messages[id] = { id, content };
        await writeFile(this.nameFile, JSON.stringify(messages));
        return id;
    }
}