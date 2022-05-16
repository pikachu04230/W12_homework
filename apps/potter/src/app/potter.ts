export class Potter {
    private books: number[] = []
    buy (basket: number[]) {
        this.books = basket;
    }

    get price() {
        if (this.books.length == 0) {
            return 0;
        }
        else {
            return this.books.length * 8;
        }
    }
}