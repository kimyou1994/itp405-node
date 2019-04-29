const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Note = require('./models/note.js');

const { Op } = Sequelize;

const app = express();

app.use(bodyParser.json());


app.get('/api/notes', function(request, response) {
	let filter = {};
	let { q } = request.query;
	if (q) {
		filter = {
			where: {
				name: {
					[Op.like]: `%${q}%`
				}
			}
		};
	};
	Note.findAll(filter).then((notes) => {
		response.json(notes);
	});
});


app.get('/api/notes/:id', function(request, response) {
	let { id } = request.params;
	Note.findByPk(id).then((note) => {
		if (note) {
			response.json(note);
		}else {
			response.status(404).json();
		}
	});
});

app.post('/api/notes', function(request, response) {
	Note.create({
		name: request.body.name,
		url: request.body.url,
		author: request.body.author,
		channel: request.body.channel,
		note: request.body.note,
		userId: "7"
	}).then((note) => {
		response.json(note);
	},(validation) => {
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				}
			})
		});
	});
});

app.patch('/api/notes/:id', function(request, response) {
	let { id } = request.params;
	Note.findByPk(id).then((note)=>{
	if (note){
	}else{
		return Promise.reject();
	}
	}).then(()=>{
		Note.update({
			note: request.body.note
		},{ where:{ id : request.params.id }
	}).then(()=>{
		response.status(200).send();
	},(validation)=>{
		response.status(422).json({
				errors: validation.errors.map((error)=>{
		    		return {
		    			attribute: error.path,
		    			message: error.message
		    		}
		  		})
		    })
		});
	},()=>{
		response.status(404).send();
	});
});

app.delete('/api/notes/:id', function(request, response) {
  let { id } = request.params;

  Note.findByPk(id).then((note) => {
		if (note) {
			return note.destroy();
		} else {
			return Promise.reject();
		}
    })
    .then(() => {
      response.status(204).send();
    }, () => {
      response.status(404).send();
    });
});

app.listen(process.env.PORT || 8000);
