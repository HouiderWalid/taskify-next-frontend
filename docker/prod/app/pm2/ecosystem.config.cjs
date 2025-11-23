module.exports = {
    apps : [
        {
            name: 'taskify',
            exec_mode: 'cluster',
            instances: 1,
            script: './node_modules/next/dist/bin/next',
            args: 'start -p 4500'
        },
        {
            name: 'nginx',
            script: 'nginx',
            args: '-g "daemon off;"',
            autorestart: false
        }
    ]
};