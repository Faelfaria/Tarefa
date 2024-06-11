import { executeTransation } from "../database/Database";
import { StringBuilderUtils } from "../utils/StringBuilderUtils";

export type Task = {
    id?: number;
    titulo: string;
    descricao: string;
    status: string;
    dataDeCriacao: string;
}

export default class TaskRepository {

    private tableName: string = "task";

    constructor() {
        this.up();
    }

    private async up() : Promise<void> {
        const sb: StringBuilderUtils = new StringBuilderUtils();
        sb.append(`CREATE TABLE IF NOT EXISTS ${this.tableName} ( `);
        sb.append("id INTEGER PRIMARY KEY AUTOINCREMENT, ");
        sb.append("titulo TEXT NOT NULL, ");
        sb.append("descricao TEXT NOT NULL, ");
        sb.append("status TEXT NOT NULL, ");
        sb.append("dataDeCriacao TEXT NOT NULL );");
        const sql: string = sb.toString();
        await executeTransation(sql);
    }

    public async down(): Promise<void> {
        await executeTransation(`DROP TABLE ${this.tableName}`);
    }

    public async create(task: Task): Promise<number | undefined> {
        const sql: string = `INSERT INTO ${this.tableName} (titulo, descricao, status, dataDeCriacao) VALUES (?, ?, ?, ?)`;
        const args = [
            task.titulo,
            task.descricao,
            task.status,
            task.dataDeCriacao
        ];
        const resultado = await executeTransation(sql, args);
        return resultado.insertId;
    }

    public async listarTasks(): Promise<Task[]> {

        const tasks: Task[] = [];

        const sql: string = `SELECT * FROM ${this.tableName}`;
        const consulta = await executeTransation(sql);

        for(let i = 0; i < consulta.rows.length; i++){
            const task = consulta.rows.item(i);
            tasks.push({
                id: task.id,
                titulo: task.titulo,
                descricao: task.descricao,
                status: task.status,
                dataDeCriacao: task.dataDeCriacao
            });
        }

        return tasks;
    }
}
