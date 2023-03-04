const express = require('express')
const app = express()
const {syncAndSeed} = require('./db')

app.use('/assets', express.static('assets'))

app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'));

app.get('/', (req, res) => res.redirect('/things'))
app.use('/things', require('./routers/things'))

app.use((err, req, res, next)=> {
  console.log(err);
  next(err);
});

const port = process.env.PORT || 3000

app.listen(port, async() => {
	try {
		await syncAndSeed()
		console.log(`listening on ${port}`)
	} catch (error) {
		console.error(error);
	}
})