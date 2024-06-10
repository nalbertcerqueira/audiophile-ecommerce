import { AddManyCartItemsRepository } from "../../repositories/cart/addManyCartItemsRepository"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { UserInfo } from "../../protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cart"

interface MoveCartItemsInputDTO {
    from: UserInfo
    to: UserInfo
    items: Pick<CartProduct, "productId" | "quantity">[]
}

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
