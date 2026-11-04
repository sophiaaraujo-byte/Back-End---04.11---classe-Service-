import {
    Injectable,
    BadRequestException,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flor } from '../flor.entity.js';

type DadosFlor = Pick<Flor, 'nome' | 'origem' | 'estoque'>;
type DadosAtualizados = Partial<DadosFlor>;

@Injectable()
export class FlorService {
    constructor(
        @InjectRepository(Flor)
        private readonly florRepository: Repository<Flor>
    ) { }

    listar(): Promise<Flor[]> {
        return this.florRepository.find();
    }

    async buscarPorId(id: number): Promise<Flor> {
        const flor = await this.florRepository.findOneBy({ id });
        if (!flor) {
            throw new NotFoundException('Flor não encontrada');
        }
        return flor;
    }

    async adicionar(dados: DadosFlor): Promise<Flor> {
        if (dados.estoque < 0) {
            throw new BadRequestException('Estoque inválido');
        }

        const existente = await this.florRepository.findOneBy({
            origem: dados.origem,
        });

        if (existente) {
            throw new ConflictException('Já existe uma flor cadastrada com esta origem');
        }

        const flor = this.florRepository.create(dados);
        return this.florRepository.save(flor);
    }

    async atualizar(
        id: number,
        dados: DadosAtualizados,
    ): Promise<Flor> {
        const flor = await this.buscarPorId(id);

        if (dados.estoque !== undefined && dados.estoque < 0) {
            throw new BadRequestException('Estoque inválido');
        }

        if (dados.origem && dados.origem !== flor.origem) {
            const existente = await this.florRepository.findOneBy({
                origem: dados.origem,
            });

            if (existente) {
                throw new ConflictException('Já existe uma flor cadastrada com esta origem');
            }
        }

        Object.assign(flor, dados);
        return this.florRepository.save(flor);
    }

    async remover(id: number): Promise<void> {
        const flor = await this.buscarPorId(id);
        await this.florRepository.remove(flor);
    }
}