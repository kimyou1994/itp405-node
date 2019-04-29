const frisby = require('frisby');


it('should return status of 200 when the list of notes are found', () => {
	return frisby
		.get('http://localhost:8000/api/notes')
		.expect('status', 200);
})
it('should return status of 200 when the note is found', () => {
	return frisby
		.get('http://localhost:8000/api/notes/2')
		.expect('status', 200)
		.expect('json', 'name', 'Authentication, Middleware, and Migrations in Laravel');
});

it('should return status of 404 when the note is not found', () => {
	return frisby
		.get('http://localhost:8000/api/notes/-1')
		.expect('status', 404);
});

it('should create a note', () => {
	return frisby
		.post('http://localhost:8000/api/notes', {
			name: 'Testing Post',
			url: 'URL goes here',
			author: 'name of author',
			channel: 'url of channel',
			note: 'written note',
			userId: "7"
		})
		.expect('status', 200)
		.expect('json', 'name', 'Testing Post')
		.expect('json', 'url', 'URL goes here')
		.expect('json', 'author', 'name of author')
		.expect('json', 'channel', 'url of channel')
		.expect('json', 'note', 'written note');
});

it('should return status of 404 when one of required variable is not filled in when creating a note', () => {
	return frisby
		.post('http://localhost:8000/api/notes', {
			name: 'Testing Post',
			url: 'URL goes here',
			author: 'name of author',
			channel: 'url of channel',
			userId: "7"
		})
		.expect('status', 422);
});

it('should return status of 204 when deleting note succeed', () => {
	return frisby
		.del('http://localhost:8000/api/notes/3')
		.expect('status', 204);
});

it('should return status of 404 when trying to delete non-exist note', () => {
	return frisby
		.del('http://localhost:8000/api/notes/-1')
		.expect('status', 404);
})