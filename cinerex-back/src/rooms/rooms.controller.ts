import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/Decorators/auth.decorator';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {

    constructor(private readonly roomsService: RoomsService){}
    
    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get()
    findAll(){
        return this.roomsService.findAll();
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.CLIENT)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(id);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto){
        return this.roomsService.update(id, updateRoomDto);
    }

    @Auth(ROLES.ADMIN, ROLES.MANAGER)
    @Delete('id')
    remove(@Param('id') id: string){
        return this.roomsService.remove(id)
    }
}
