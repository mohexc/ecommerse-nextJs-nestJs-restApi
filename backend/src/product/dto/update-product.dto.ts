import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    images: string[];

    @IsNotEmpty()
    video: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    countInStock: number;
}