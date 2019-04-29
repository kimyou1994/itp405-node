let express = require('express');
let knex = require('knex');

let app = express();

app.get('/api/notes', function(request, response) {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});
	connection.select().from('notes').then((notes) => {
		response.json(notes);
	})
});


app.get('/api/notes/:id', function(request, response) {
	let id = request.params.id;

	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});
	connection
		.select()
		.from('notes')
		.where('note_id', id)
		.first()
		.then((note) => {
			if (note) {
				response.json(note);
			}else {
				response.status(404).json({
					error: `Note ${id} not found `
				})
			}
		})
});
app.listen(process.env.PORT || 8000);

// return new Promise((resolve, reject) => {
// 	resolve()
// })