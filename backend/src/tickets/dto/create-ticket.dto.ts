import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDefined, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
    @IsDefined()
    @IsString()
    @ApiProperty({
        example : 'Queen'
    })
    performer : string

    @IsDefined()
    @IsString()
    @ApiProperty({
        example: '2025-05-30T15:30:00.990z'
    })
    startTime : Date

    @IsDefined()
    @IsNumber()
    @ApiProperty({
        example: 120
    })
    length : number

}
