import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flor } from "./flor.entity.js";
import { FlorService } from './flor/flor.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Flor])],
    providers: [FlorService],
})
export class FlorModule { }