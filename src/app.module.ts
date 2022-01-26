import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import { join } from 'path';
import { graphqlUploadExpress } from "graphql-upload"




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'yuri',
      password: process.env.POSTGRES_PASSWORD || '3012',
      database: process.env.POSTGRES_DBc || 'cats_db',
      entities: ["dist/**/*.entity{ .ts,.js}"],
      synchronize: false,
      migrations: ["dist/migrations/*{.ts ,.js}"],
      migrationsRun: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      include: [CatModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(graphqlUploadExpress()).forRoutes("graphql")
  }
}

