const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});
router.get('/add2', (req, res) => {
    res.render('links/add2');
});

router.post('/add2', async (req, res) => {
    const { fullname,username, password,rol } = req.body;
    const newUser = {
        fullname,
        username,
        password,
        rol,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO users1 SET ? ', newUser);
    req.flash('success', 'user Saved Successfully');
    res.redirect('/links');
});


router.get('/addtesis', (req, res) => {
    res.render('links/addestu');
});


router.post('/addtesis', async (req, res) => {
    const { titulo ,autor ,asesor ,archivo,description } = req.body;
    console.log(req.body);
    const newTes = {
        titulo, 
        autor, 
        asesor,
        archivo,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO tesis set ?', [newTes]);
    req.flash('success', 'tesis Saved Successfully');
    res.redirect('/links');
});
router.get('/', isLoggedIn, async (req, res) => {
    if (req.user.rol==='ase'){
        
    }else if (req.user.rol==='est'){
        const tesis= await pool.query('SELECT * FROM users1 WHERE user_id = ?', [req.user.id]);
        res.render('links/listTesis', {tesis});

    }else {
        const users1= await pool.query('SELECT * FROM users1 WHERE user_id = ?', [req.user.id]);
        res.render('links/list', { users1 });
    }
    
});
router.get('/listTesis' , async (req, res) => {
    const tesis = await pool.query('SELECT * FROM tesis WHERE user_id = ?', [req.user.id]);
    res.render('links/listTesis', { tesis });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users1 WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await pool.query('SELECT * FROM users1 WHERE id = ?', [id]);
    console.log(usuario);
    res.render('links/edit', {usuario: usuario[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname,username, password,rol } = req.body;
    const newUser = {
        fullname,
        username,
        password,
        rol,
        user_id: req.user.id
    };
    await pool.query('UPDATE users1 set ? WHERE id = ?', [newUser, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;