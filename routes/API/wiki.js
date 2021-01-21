const express = require('express')
const fs = require('fs');
const router = express.Router();
const path = require('path');
const WikiPage = require('../../models/pages');

// get the list of all the pages
router.get('/', async (req,res) => {
    try
    {
        const pages = await WikiPage.find();
        res.send(pages)
    }
    catch(err)
    {
        res.json({ "msg" : err});
    }
})

// get the list of a specific page
router.get('/:id', async (req,res) => {
    try
    {
        const page = await WikiPage.find({ _id : req.params.id});
        res.send(page)
    }
    catch(err)
    {
        res.json({ "msg" : err});
    }
})

// get the list of searched pages
router.get('/search/:q', async (req,res) => {
    try
    {
        const q = req.params.q
        const pages = await WikiPage.find({ title : new RegExp(q)});
        res.send(pages)
    }
    catch(err)
    {
        res.json({ "msg" : err});
    }
})

// post request to save a page
router.post('/', async (req,res) => {
    const title = req.body.title.toLowerCase();
    const content = req.body.content;
    const page = new WikiPage({
        title : title,
        content : content
    })
    try
    {
        await page.save();
        res.json({ "msg" : "Page Saved"});
    }
    catch(err)
    {
        res.json({ "msg" : err});
    }
})

// delete request to remove a page
router.delete('/:id', async (req,res) => {
    try
    {
        await WikiPage.deleteOne({ _id : req.params.id })
        res.json({ "msg" : "Page Deleted"});
    }
    catch(err)
    {
        res.json({ "msg" : err});
    }
})

module.exports = router