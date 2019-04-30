const { expect } = require('chai');
const Note = require('./../../../models/note');

it('note should not be an empty string', async() => {
	try {
		let note = new Note( { 
			name: 'Testing Post',
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: 'name of author',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vwl',
			note: '',
			userId: "7"
		})
		await note.validate();
	}catch(error) {
		expect(error.errors[0].message).to.equal('Note is required');
	}
})

it('url should be url address', async() => {
	try {
		let note = new Note( { 
			name: 'Testing Post',
			url: 'url is not address',
			author: 'name of author',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vwl',
			note: 'note given',
			userId: "7"
		})
		await note.validate();
	}catch(error) {
		expect(error.errors[0].message).to.equal('URL must be url address');
	}
})

it('name should not be an empty string', async() => {
	try {
		let note = new Note( { 
			name: '',
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: 'name of author',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vwl',
			note: 'note given ',
			userId: "7"
		})
		await note.validate();
	}catch(error) {
		expect(error.errors[0].message).to.equal('Name is required');
	}
})

it('author should not be an empty string', async() => {
	try {
		let note = new Note( { 
			name: 'Testing Post',
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: '',
			channel: 'https://www.youtube.com/channel/UCLhLYSysw4juedNhsXGo7Vwl',
			note: 'note given',
			userId: "7"
		})
		await note.validate();
	}catch(error) {
		expect(error.errors[0].message).to.equal('Author is required');
	}
})

it('channel should be url address that contains channel', async() => {
	try {
		let note = new Note( { 
			name: 'Testing Post',
			url: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			author: 'name of author',
			channel: 'https://www.youtube.com/watch?v=vK4t3SMOr_0',
			note: 'note given',
			userId: "7"
		})
		await note.validate();
	}catch(error) {
		expect(error.errors[0].message).to.equal('channel url should contain channel');
	}
})