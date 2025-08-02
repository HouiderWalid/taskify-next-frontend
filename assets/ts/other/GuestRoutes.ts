export default class GuestRoutes {

    static SIGNIN = {
        NAME: 'signin',
        PATH: '/signin',
    }

    static SIGNUP = {
        NAME: 'signup',
        PATH: '/signup',
    }

    static PASSWORD_REQUEST = {
        NAME: 'password_request',
        PATH: '/password_request',
    }

    static getAllRoutes(){
        return [
            this.SIGNIN,
            this.SIGNUP,
            this.PASSWORD_REQUEST,
        ]
    }

    static getAllRoutesNames(){
        return this.getAllRoutes().map(route => route.NAME)
    }
}