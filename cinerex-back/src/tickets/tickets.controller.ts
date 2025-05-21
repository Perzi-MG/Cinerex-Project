import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/Decorators/auth.decorator';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {

    constructor(private readonly ticketsService: TicketsService){}

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Post()
    create(@Body() createTicketDto: CreateTicketDto){
        return this.ticketsService.create(createTicketDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Get()
    findAll(){
        return this.ticketsService.findAll();
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.ticketsService.findOne(id)
    }

    @Auth(ROLES.ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto){
        return this.ticketsService.update(id, updateTicketDto);
    }

    @Auth(ROLES.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.ticketsService.remove(id)
    }

}
