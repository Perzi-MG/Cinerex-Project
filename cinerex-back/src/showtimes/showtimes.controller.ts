import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@ApiTags('showtimes')
@Controller('showtimes')
export class ShowtimesController {

    constructor(private readonly showtimesService: ShowtimesService){}

    @Post()
    create(@Body() createShowtimeDto: CreateShowtimeDto){
        return this.showtimesService.create(createShowtimeDto);
    }

    @Get()
    findAll(@Query('movieId') movieId?: string){
        return this.showtimesService.findAll(movieId);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.showtimesService.findOne(id);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto){
        return this.showtimesService.update(id, updateShowtimeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.showtimesService.remove(id);
    }

}
