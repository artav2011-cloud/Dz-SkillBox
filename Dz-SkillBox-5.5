class HanoiTower<T = number> {
    private rods: { [key: string]: T[] } = {};

    constructor(private fromRod: string = "First", private toRod: string = "Second", private auxRod: string = "Third") {
        this.rods[fromRod] = [];
        this.rods[toRod] = [];
        this.rods[auxRod] = [];
    }

    // Метод для добавления дисков на начальный стержень
    addDisks(disks: T[]): void {
        this.rods[this.fromRod] = disks;
    }

    // Метод для решения задачи
    solve(): void {
        const numberOfDisks = this.rods[this.fromRod].length;
        this.move(numberOfDisks, this.fromRod, this.toRod, this.auxRod);
    }

    // Внутренний рекурсивный метод для перемещения дисков
    private move(n: number, from: string, to: string, aux: string): void {
        if (n === 0) {
            return;
        }

        this.move(n - 1, from, aux, to);

        const disk = this.rods[from].pop();
        if (disk !== undefined) {
            this.rods[to].push(disk);
            console.log(`Переместить диск ${disk} с ${from} на ${to}`);
        }

        this.move(n - 1, aux, to, from);
    }
}