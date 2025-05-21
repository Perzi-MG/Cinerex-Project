import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {

    constructor (
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>
    ) {}
    create(createMovieDto: CreateMovieDto){
        const movie = this.movieRepository.save(createMovieDto)
        return movie
    }

    findAll() {
        return this.movieRepository.find();
    }

    findOne(id: string){
        const movie = this.movieRepository.findOne({
            where: {
                movieId: id
            }
        })
        return movie
    }

    async update(id: string, updateMovieDto: UpdateMovieDto){
        const movieToUpdate = await this.movieRepository.preload({
            movieId: id,
            ... updateMovieDto
        })
        if (!movieToUpdate) throw new NotFoundException();
        this.movieRepository.save(movieToUpdate)
        return movieToUpdate
    }

    remove(id: string){
        this.movieRepository.delete({
            movieId: id
        })
        return {
            message: "Movie deleted"
        }
    }
}
