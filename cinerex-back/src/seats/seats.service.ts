import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {

    constructor(
        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>
    ){}

    create(createSeatDto: CreateSeatDto){
        const seat = this.seatRepository.save(createSeatDto);
        return seat;
    }

    findAll(){
        return this.seatRepository.find();
    }

    findOne(id: string){
        const seat = this.seatRepository.findOne({
            where: {
                seatId: id,
            }
        });
        return seat;
    }

    async update(id: string, updateSeatDto: UpdateSeatDto){
        const seatToUpdate = await this.seatRepository.preload({
            seatId: id,
            ... updateSeatDto
        })
        if(!seatToUpdate) throw new NotFoundException()
        this.seatRepository.save(seatToUpdate);
    return seatToUpdate;
    }

    remove(id: string){
        return this.seatRepository.delete({
            seatId: id
        })
    }

}
