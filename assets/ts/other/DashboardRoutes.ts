export default class DashboardRoutes {

    static OVERVIEW = {
        NAME: 'overview',
        PATH: '/'
    }

    static TASKS = {
        NAME: 'tasks',
        PATH: '/tasks'
    }

    static PROJECTS = {
        NAME: 'projects',
        PATH: '/projects'
    }

    static USERS = {
        NAME: 'users',
        PATH: '/users'
    }

    static SETTINGS = {
        NAME: 'settings',
        PATH: '/settings'
    }

    static NOT_PERMITTED = {
        NAME: 'not-permitted',
        PATH: '/not-permitted'
    }

    static getAllRoutes(){
        return [
            this.OVERVIEW,
            this.TASKS,
            this.PROJECTS,
            this.USERS,
            this.SETTINGS,
            this.NOT_PERMITTED,
        ]
    }

    static getAllRoutesNames(){
        return this.getAllRoutes().map(route => route.NAME)
    }
}