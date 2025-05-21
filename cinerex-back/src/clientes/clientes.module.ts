import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientesController],
    providers: [ClientesService],
    exports: [ClientesModule]
})
export class ClientesModule {}
