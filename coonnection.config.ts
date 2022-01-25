import {ConnectionOptions} from "typeorm";


const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'yuri',
    password: process.env.POSTGRES_PASSWORD || '3012',
    database: process.env.POSTGRES_DB || 'cats_db',
    entities: ["src/**/*.entity.ts"],
    synchronize: false,
    migrations: ["migrations/*.ts"],
    cli: { migrationsDir: 'migrations' },
    migrationsTransactionMode: 'none'
};

export = config;