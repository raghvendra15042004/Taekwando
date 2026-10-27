export class MenuConfig {

    constructor() {
    }

    public defaults: any = {
        menu: {
            '100': {
                name: 'taekwondoChampionship2021',
                title: 'Taekwondo Championship 2021',
                id: 'taekwondoChampionship2021',
                boxId: '100',
                icon: 'fas fa-hotel',
                landingPage: '/feature/100/inbox/1001',
                items: [
                    {
                        title: 'Participants',
                        root: true,
                        id: 'orders',
                        page: '/feature/100/inbox/1001'
                    },
                    {
                        title: 'Tie Sheet',
                        root: true,
                        id: 'tie-sheet',
                        page: '/custom/tie-sheet'
                    },
                    {
                        title: 'Common ID Card',
                        root: true,
                        id: 'id-card',
                        page: '/feature/100/inbox/1003'
                    }
                ]
            }
        }
    };

    public get configs(): any {
        return this.defaults;
    }
}