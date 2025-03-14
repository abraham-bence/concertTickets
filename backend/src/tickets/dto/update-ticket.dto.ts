import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsBoolean, IsDecimal, IsDefined } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    isMissed? : boolean
}
