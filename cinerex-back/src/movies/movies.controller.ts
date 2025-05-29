import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Post()
    create(@Body() createMovieDto: CreateMovieDto){
        return this.moviesService.create(createMovieDto)
    }
    @Get()
    findAll(){
        return this.moviesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.moviesService.findOne(id)
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Patch()
    update(@Param('id') id:string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.moviesService.remove(id);
    }
}
