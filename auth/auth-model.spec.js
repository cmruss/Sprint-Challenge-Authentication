const Users = require('./auth-model')
const db = require('../database/dbConfig');

describe('auth-model', function() {

    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    beforeEach(async function() {
        await db('users').truncate();
    })

    describe('add()', function() {
        it('adds user to db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            const users = await db('users')
            expect(users).toHaveLength(1);
        })
    })

    describe('find()', function() {
        it('finds all users in db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            await Users.add({
                username: 'mutch', 
                password: 'mustmeans', 
            });
           
            const users = await Users.find()
            expect(users).toHaveLength(2);
        })
    })

    describe('findById()', function() {
        it('finds user by id from db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            await Users.add({
                username: 'mutch', 
                password: 'mustmeans', 
            });
           
            const user = await Users.findById(2)
            expect(user.username).toBe('mutch');
        })
    })

    describe('findBy(prop)', function() {
        it('finds user by property from db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            await Users.add({
                username: 'mutch', 
                password: 'mustmeans', 
            });
           
            const user = await Users.findById(2)
            expect(user.username).toBe('mutch');
        })
    })

    describe('remove()', function() {
        it('deletes user from db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            await Users.add({
                username: 'mutch', 
                password: 'mustmeans', 
            });
            await Users.remove(2)

            const users = await db('users')
            expect(users).toHaveLength(1);
        })
    })

    describe('edit()', function() {
        it('edits user in db', async function() {
            await Users.add({
                username: 'cody', 
                password: 'russell', 
            });
            await Users.edit(1, ({
                username: 'mutch', 
                password: 'mustmeans', 
            }));

            const user = await Users.findById(1)
            expect(user.username).toBe('mutch');
            expect(user.password).toBe('mustmeans');

        })
    });   
});