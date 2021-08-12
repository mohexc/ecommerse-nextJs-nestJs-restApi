import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly price: number;
}