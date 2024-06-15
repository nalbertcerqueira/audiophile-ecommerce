import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { MoveCartItemsInputDTO } from "./cartDTOs"
import { AddManyCartItemsRepository } from "../../repositories/cart/addManyCartItemsRepository"

export class DbMoveCartItemsUseCase {
    constructor(
        private readonly addManyCartItemsRepository: AddManyCartItemsRepository,
        private readonly clearCartRepository: ClearCartRepository
    ) {}

    public async execute(data: MoveCartItemsInputDTO): Promise<void> {
        const { from, to, items } = data

        if (!items.length) {
            return
        }

        await Promise.all([
            this.addManyCartItemsRepository.addManyItems({ id: to.id, type: to.type }, items),
            this.clearCartRepository.clearCartById({
                id: from.id,
                type: from.type
            })
        ])
    }
}
