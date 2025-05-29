import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {

    constructor(private readonly clientsService: ClientesService){}

    @Post()
    async create(@Body() createClientDto: CreateClientDto){
        console.log(createClientDto)
        return this.clientsService.create(createClientDto);
    }

    @Get()
    findAll(){
        return this.clientsService.findAll();
    }

    @Auth(ROLES.ADMIN, ROLES.CLIENT)
    @Get('/:id')
    findOne(@Param('id') id: string){
        return this.clientsService.findOne(id);
    }

    @Auth(ROLES.ADMIN, ROLES.CLIENT)
    @Patch('/:id')
    update(@Param('id') id: string, updateClientDto: UpdateClientDto){
        return this.clientsService.update(id, updateClientDto);
    }

    @Auth(ROLES.ADMIN, ROLES.CLIENT)
    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.clientsService.remove(id);
    }

}
