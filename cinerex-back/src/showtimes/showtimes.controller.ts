import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/Decorators/auth.decorator';

@ApiTags('showtimes')
@Controller('showtimes')
export class ShowtimesController {

    constructor(private readonly showtimesService: ShowtimesService){}

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Post()
    create(@Body() createShowtimeDto: CreateShowtimeDto){
        return this.showtimesService.create(createShowtimeDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get()
    findAll(){
        return this.showtimesService.findAll();
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.showtimesService.findOne(id);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id') id: string, updateShowtimeDto: UpdateShowtimeDto){
        return this.showtimesService.update(id, updateShowtimeDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.showtimesService.remove(id);
    }

}
