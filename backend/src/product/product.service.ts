import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,) { }

  async create(createProductDto: CreateProductDto) {
    const createProduct = await this.productRepository.save(createProductDto)
    return createProduct
  }

  async findAll() {
    const result = await this.productRepository.find();
    return result
  }

  async findOne(id: number) {
    const foundProduct = await this.productRepository.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException({ message: `Product ${id} not found` })
    }
    return foundProduct
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({ message: `Product ${id} not found` })
    }
    const { description, name, price, title, images, video, brand, category, countInStock } = updateProductDto
    found.name = name ? name : found.name
    found.description = description ? description : found.description
    found.title = title ? title : found.title
    found.brand = brand ? brand : found.brand
    found.category = category ? category : found.category
    found.countInStock = countInStock ? countInStock : found.countInStock
    found.video = video ? video : found.video
    found.price = price ? price : found.price
    found.images = images ? images : found.images

    return await this.productRepository.save(found)
  }

  async remove(id: number) {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({ message: `Product ${id} not found` })
    }
    return await this.productRepository.remove(found)
  }
}
