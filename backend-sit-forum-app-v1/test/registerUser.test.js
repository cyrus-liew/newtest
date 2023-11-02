//const chai = require('chai');
import chai from 'chai';
const expect = chai.expect;
import { registerUser } from '../controllers/userControllers.js'; // Import the loginUser function

describe('registerUser', () => {
    it('should throw an error for an invalid email', async () => {
        const req = { body: { name: 'Test User', email: 'invalid-email', password: 'valid-password' } };
        const res = {};
        const next = err => {
            expect(err.message).to.equal('Email is not valid');
        };

        await registerUser(req, res, next);
    });
});