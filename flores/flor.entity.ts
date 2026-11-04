import {
    Entity,
    PrimaryGeneratedColumn,
    Column

} from "typeorm";
@Entity('flores')
export class Flor {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 20 })
    nome!: string;

    @Column({ length: 50 })
    origem!: string;

    @Column({ type: 'int' })
    estoque!: number;
}