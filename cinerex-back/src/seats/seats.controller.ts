import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/Decorators/auth.decorator';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {

    constructor(private readonly seatsService: SeatsService){}

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Post()
    create(@Body() createSeatDto: CreateSeatDto){
        return this.seatsService.create(createSeatDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get()
    findAll(){
        return this.seatsService.findAll();
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.seatsService.findOne(id);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto){
        return this.seatsService.update(id, updateSeatDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.seatsService.remove(id)
    }

}
