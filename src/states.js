export class CardState {
    constructor() {
        if (this.constructor.name === 'CardState') {
            throw new Error(
                'CardState is an abstract class. You can’t have an instance of it',
            );
        }
    }
}

export class Loading extends CardState {}

export class LoadingError extends CardState {
    constructor(err) {
        super();
        this.err = err;
    }
}

export class Display extends CardState {
    // Example data:
    // {
    //     fullName: 'James Sinclair',
    //     companyName: 'jrsinclair.com',
    //     avatarUrl: 'http://example.com/james-avatar.jpg',
    //     email: 'james@example.com',
    // }
    constructor(data) {
        super();
        this.data = data;
    }
}
