export class BoxConfig {
    public defaults: any = [
        {
            "id": 100,
            "name": "taekwondoChampionship2021",
            "masterBundle": 1001,
            "slaveBundle": []
        }
    ];

    public get configs(): any {
        return this.defaults;
    }
}