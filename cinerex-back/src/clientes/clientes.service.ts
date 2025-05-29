import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientesService {

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){}

    create(createClientDto: CreateClientDto){
        const client =  this.clientRepository.save(createClientDto);
        console.log(client)
        return client;
    }

    findAll(){
        return this.clientRepository.find({
            relations: {
                user: true
            }
        })
    }

    findOne(id: string){
        const client = this.clientRepository.findOne({
            where: {
                clientId: id
            },
            relations: {
                user: true
            }
        })
    }

    async update(id: string, updateClientDto: UpdateClientDto){
        const clientToUpdate = await this.clientRepository.preload({
            clientId: id,
            ... updateClientDto
        })
        if(!clientToUpdate) throw new NotFoundException();
        this.clientRepository.save(clientToUpdate);
        return clientToUpdate;
    }

    remove(id: string){
        return this.clientRepository.delete({
            clientId: id
        })
    }
}
