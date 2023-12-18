const express = require('express');
const app = express();
const Keycloak = require("keycloak-connect");

const session = require('express-session');
    const memoryStore = new session.MemoryStore();

    // Configure session
    app.use(
      session({
        secret: 'test',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );
    const kcConfig = {
        clientId: 'test',
        serverUrl: 'http://localhost:8080',
        realm: 'master'
    };

    const keycloak = new Keycloak({ store: memoryStore}, kcConfig);

app.use( keycloak.middleware() );

app.listen(3000, function () {
    console.log('App listening on port 3000');
    app.get('/apis/me', keycloak.enforcer('user:profile', {response_mode: 'token'}), function (req, res) {
        const token = req.kauth.grant.access_token.content;
        const permissions = token.authorization ? token.authorization.permissions : undefined;
        console.log(token)
        console.log(permissions)
        // show user profile
    });
});
    