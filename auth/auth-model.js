const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    edit
};

async function add(user) {
    const [id] = await db('users')
        .insert(user);

    return findById(id)
};

function find() {
    return db('users')
        .select('id', 'username');
};

function findBy(prop) {
    return db('users')
        .where(prop);
};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
};

function remove(id) {
    return findById(id).del()
}

function edit(id, changes) {
    return findById(id).update(changes)
}