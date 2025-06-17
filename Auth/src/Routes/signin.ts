import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send('Current user route');
});

export { router as signinRouter  };