const should = require('should') // eslint-disable-line
const setup = require('../setup')
const FF_UTIL = require('flowforge-test-utils')
const { Roles } = FF_UTIL.require('forge/lib/roles')

describe('User API', async function () {
    let app
    const TestObjects = {}

    beforeEach(async function () {
        app = await setup({ features: { devices: true } })

        // alice : admin, team owner
        // bob
        // chris : (unverified_email)

        // ATeam ( alice  (owner), bob (owner), chris)
        // BTeam ( bob (owner), chris)

        // Alice create in setup()
        TestObjects.alice = await app.db.models.User.byUsername('alice')
        TestObjects.bob = await app.db.models.User.create({ username: 'bob', name: 'Bob Solo', email: 'bob@example.com', email_verified: true, password: 'bbPassword', admin: true })
        TestObjects.chris = await app.db.models.User.create({ username: 'chris', name: 'Chris Kenobi', email: 'chris@example.com', password: 'ccPassword' })

        // ATeam create in setup()
        TestObjects.ATeam = await app.db.models.Team.byName('ATeam')
        TestObjects.BTeam = await app.db.models.Team.create({ name: 'BTeam' })

        // Alice set as ATeam owner in setup()
        await TestObjects.ATeam.addUser(TestObjects.bob, { through: { role: Roles.Owner } })
        await TestObjects.ATeam.addUser(TestObjects.chris, { through: { role: Roles.Member } })
        await TestObjects.BTeam.addUser(TestObjects.bob, { through: { role: Roles.Owner } })
        await TestObjects.BTeam.addUser(TestObjects.chris, { through: { role: Roles.Member } })

        TestObjects.tokens = {}
    })

    async function login (username, password) {
        const response = await app.inject({
            method: 'POST',
            url: '/account/login',
            payload: { username, password, remember: false }
        })
        response.cookies.should.have.length(1)
        response.cookies[0].should.have.property('name', 'sid')
        TestObjects.tokens[username] = response.cookies[0].value
    }

    afterEach(async function () {
        await app.close()
    })

    describe('User settings', async function () {
        it('returns 401 on /user if not logged in', async function () {
            // await login('alice', 'aaPassword')
            // await login('bob', 'bbPassword')
            // await login('chris', 'ccPassword')
            const response = await app.inject({
                method: 'GET',
                url: '/api/v1/user'
            })
            response.statusCode.should.equal(401)
        })
        it('return user info for logged in user', async function () {
            await login('alice', 'aaPassword')
            const response = await app.inject({
                method: 'GET',
                url: '/api/v1/user',
                cookies: { sid: TestObjects.tokens.alice }
            })
            response.statusCode.should.equal(200)
            const result = response.json()
            result.should.have.property('id', TestObjects.alice.hashid)
            result.should.have.property('username', TestObjects.alice.username)
            result.should.have.property('email', TestObjects.alice.email)
        })
        it('return user info for unverified_email user', async function () {
            await login('chris', 'ccPassword')
            const response = await app.inject({
                method: 'GET',
                url: '/api/v1/user',
                cookies: { sid: TestObjects.tokens.chris }
            })
            response.statusCode.should.equal(200)
            const result = response.json()
            result.should.have.property('id', TestObjects.chris.hashid)
            result.should.have.property('username', TestObjects.chris.username)
            result.should.have.property('email', TestObjects.chris.email)
            result.should.have.property('email_verified', false)
        })
    })
})