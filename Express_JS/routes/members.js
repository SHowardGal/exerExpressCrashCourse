const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../Members');

router.get('/', (req, res) => res.json(members));

// router.get('/api/members', (req, res) => res.json(members));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    // res.send(req.body);
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMeber.email ? updMember.email : member.email;

                res.json({msg: 'Member updated', member});
            }
        });
    
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});


router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
    res.json({
        msg: 'Member deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))
    });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

module.exports = router;
© 2021 GitHub, Inc.
Terms
Privacy
Security
