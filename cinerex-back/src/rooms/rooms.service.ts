import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {

    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>
    ) {}

    create(createRoomDto: CreateRoomDto){
        const room = this.roomRepository.save(createRoomDto);
        return room
    }

    findAll(){
        return this.roomRepository.find()
    }

    findOne(id: string){
        const room = this.roomRepository.findOne({
            where: {
                roomId: id,
            }
        })
        return room
    }

    async update(id : string, updateRoomDto: UpdateRoomDto){
        const roomToUpdate = await this.roomRepository.preload({
            roomId: id,
            ...updateRoomDto
        })
        if(!roomToUpdate) throw new NotFoundException()
        this.roomRepository.save(roomToUpdate);
        return roomToUpdate
    }

    remove(id: string){
        return this.roomRepository.delete({
            roomId: id,
        })
    }

}
