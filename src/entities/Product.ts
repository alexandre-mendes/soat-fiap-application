import { Price } from "./vo/Price";
import { DomainError } from "./error/DomainError";

export enum CategoryType {

    SNACK = 'LANCHE',
    ACCOMPANIMENT = 'ACOMPANHAMENTO',
    DRINK = 'BEBIDA',
    DESSERT = 'SOBREMESA'
}

const CategoryTypeHelper = {
    parse: (category: string): CategoryType => {
      const isValid = Object.values(CategoryType).includes(category as CategoryType);

      if (isValid)
        return category as CategoryType

      throw new DomainError('Informe uma categoria válida.')
    },
  };

export class Product {

    private _id: string | undefined;
    private _name: string;
    private _description: string;
    private _price: Price;
    private _category: CategoryType;
    
    constructor(name: string, description: string, price: number, category: string) {
        if (!name)
            throw new DomainError('O nome é obrigatório.');

        if (!description)
            throw new DomainError('A descrição é obrigatória.');

        if (!price)
            throw new DomainError('O preço é obrigatório.');

        if (!category)
            throw new DomainError('A categoria é obrigatória.');

        this._name = name;
        this._description = description;
        this._price = new Price(price);
        this._category = CategoryTypeHelper.parse(category);
    }

    update(input: {name: string, description: string, price: number, category: string}) {
        this.updateIfValuePresent(value => this._name = value, input.name);
        this.updateIfValuePresent(value => this._description = value, input.description);
        this.updateIfValuePresent(value => this._price = new Price(value), input.price);
        this.updateIfValuePresent(value => this._category = CategoryTypeHelper.parse(value), input.category);
    }

    private updateIfValuePresent<T>(setter: (value: T) => void, value: T) {
        if (value)
            setter(value);
    }

    get id() {
        return this._id;
    }

    set id(id: string | undefined) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price.value;
    }

    get category() {
        return this._category;
    }
}