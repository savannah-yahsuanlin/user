const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/users');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING
	}
})

const Thing = db.define('thing', {
	name: {
		type: Sequelize.STRING
	}
})

Thing.belongsTo(User)


const syncAndSeed = async() => {
	await db.sync({force: true})
	const [moe, larry, lucy] = await Promise.all([
		User.create({name: 'moe'}),
		User.create({name: 'larry'}),
		User.create({name: 'lucy'}),
	])
	await Promise.all([
		Thing.create({name: 'foo', userId: lucy.id}),
		Thing.create({name: 'bazz', userId: lucy.id}),
		Thing.create({name: 'quq'})
	])
}

module.exports = {
	syncAndSeed,
	db,
	User,
	Thing
}