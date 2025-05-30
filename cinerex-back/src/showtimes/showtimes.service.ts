import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from './entities/showtime.entity';
import { Repository } from 'typeorm';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimesService {

    constructor(
        @InjectRepository(Showtime)
        private showtimeRepository: Repository<Showtime>
    ) { }

    create(createShowtimeDto: CreateShowtimeDto) {
        const showtime = this.showtimeRepository.save(createShowtimeDto);
        return showtime;
    }

    findAll(movieId?: string) {
        if (movieId) {
            return this.showtimeRepository.find({ where: { movieId } });
        }
        return this.showtimeRepository.find();
    }
    findOne(id: string) {
        const showtime = this.showtimeRepository.findOne({
            where: {
                showtimeId: id
            }
        })
        return showtime;
    }

    async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
        const showtimeToUpdate = await this.showtimeRepository.preload({
            showtimeId: id,
            ...updateShowtimeDto
        });

        if (!showtimeToUpdate) throw new NotFoundException();
        const updated = await this.showtimeRepository.save(showtimeToUpdate);
        return updated;
    }

    remove(id: string) {
        this.showtimeRepository.delete({
            showtimeId: id
        })
        return {
            message: 'Borrado'
        }
    }



}
