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
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: 'name of author',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vw',
			note: 'written note',
			userId: "7"
		})
		.expect('status', 200)
		.expect('json', 'name', 'Testing Post')
		.expect('json', 'url', 'https://www.youtube.com/watch?v=vK4t3SMOr_0')
		.expect('json', 'author', 'name of author')
		.expect('json', 'channel', 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vw')
		.expect('json', 'note', 'written note');
});

it('should return status of 404 when one of required variable is not filled in to create a note', () => {
	return frisby
		.post('http://localhost:8000/api/notes', {
			name: 'Testing Post',
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: 'name of author',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vwl',
			userId: "7"
		})
		.expect('status', 422);
});

it('should return status of 200  when updating a note', () => {
	return frisby
		.patch('http://localhost:8000/api/notes/2',{
			note: "note changed"
		})
		.expect('status', 200);
});

it('should resturn status of 404 when updating a non existant note', () => {
	return frisby
		.patch('http://localhost:8000/api/notes/-1',{
			note: "note changed"
		})
		.expect('status', 404);
})

it('should return status of 422 when one of required variable is not filled in to update a note', () => {
	return frisby
		.patch('http://localhost:8000/api/notes/2',{
			note: ""
		})
		.expect('status', 422);
});

it('should return status of 204 when deleting note succeed', () => {
	return frisby
		.del('http://localhost:8000/api/notes/5')
		.expect('status', 204);
});

it('should return status of 404 when trying to delete non-exist note', () => {
	return frisby
		.del('http://localhost:8000/api/notes/-1')
		.expect('status', 404);
})