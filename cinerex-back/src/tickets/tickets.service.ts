import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {

    constructor(
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>
    ){}

    create(createTicketDto: CreateTicketDto){
        const ticket = this.ticketRepository.save(createTicketDto as Partial<Ticket>);
        return ticket;
    }

    findAll(){
        return this.ticketRepository.find({})
    }

    findOne(id: string){
        const ticket = this.ticketRepository.findOne({
            where: {
                ticketId: id,
            }
        })
        return ticket;
    }

    async update(id: string, updateTicketDto: UpdateTicketDto){
        const ticketToUpdate = await this.ticketRepository.preload({
            ticketId: id,
            ...updateTicketDto
        })
        if(!ticketToUpdate) throw new NotFoundException();
        this.ticketRepository.save(ticketToUpdate);
        return ticketToUpdate;
    }

    remove(id: string){
        return this.ticketRepository.delete(id)
    }
} 
