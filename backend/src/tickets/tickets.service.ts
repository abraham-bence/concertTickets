import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TicketsService {

  constructor (private readonly db: PrismaService) {}

  create(createTicketDto: CreateTicketDto) {
    if(new Date(createTicketDto.startTime) < new Date()){
      throw new Error("The concert cannot be in the past")
    }
    createTicketDto.length = +createTicketDto.length
    console.log(createTicketDto.length)
    return this.db.concert.create({
      data : createTicketDto
    });
  }

  findAll() {
    return this.db.concert.findMany();
  }

  findOne(id: number) {
    return this.db.concert.findUnique({
      where : {id}
    });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.db.concert.update({
      where : {id},
      data: updateTicketDto
    });
  }

  remove(id: number) {
    return this.db.concert.delete({
      where: {id}
    });
  }
}
