import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService, private readonly awsService: AwsService) { }


    @Post()
    @UseInterceptors(FileInterceptor('moviePhoto'))
    async create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return this.moviesService.create(createMovieDto);
        } else {
            const photoUrl = await this.awsService.uploadFile(file)
            createMovieDto.moviePhoto = photoUrl;
            return this.moviesService.create(createMovieDto)
        }
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const response = await this.awsService.uploadFile(file);
        return this.moviesService.update(id, {
            moviePhoto: response
        })
    }
    @Get()
    findAll() {
        return this.moviesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        return this.moviesService.findOne(id)
    }

    @UseInterceptors(FileInterceptor("employeePhoto"))
    @Patch('/:id')
    async update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() updateMovieDto: UpdateMovieDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        if (!file) {
            // No se subió archivo, solo actualiza los datos
            return this.moviesService.update(id, updateMovieDto);
        } else {
            // Se subió archivo, súbelo a S3 y actualiza moviePhoto
            const fileUrl = await this.awsService.uploadFile(file);
            updateMovieDto.moviePhoto = fileUrl;
            return this.moviesService.update(id, updateMovieDto);
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(id);
    }
}
