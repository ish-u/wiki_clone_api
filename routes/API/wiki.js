const express = require('express')
const fs = require('fs');
const router = express.Router();
const path = require('path');

// get the list of all the pages
router.get('/', (req,res) => {
    fs.readdir('./wiki_pages', (err,files) => {
        const pages = [];
        files.forEach(file => {
            pages.push({
                "name": path.basename(file),
                "content": fs.readFileSync(path.join('./wiki_pages',file)).toString()
            })
        })
        console.log(pages);

        res.json({"pages":pages})
    })
})

// post request to save a page
router.post('/', (req,res) => {
    const page = req.body.page;
    const content = req.body.content;    
    fs.writeFile(path.join('./wiki_pages',page+'.md'), '# HELLO', (err) => {
        if(err) throw err;
        res.json({"msg":"OK"});
    })
})

// delete request to remove a page
router.delete('/:title', (req,res) => {
    const title = req.params.title +'.md'
    if(fs.existsSync(path.join('./wiki_pages',title)))
    {
        fs.unlinkSync(path.join('./wiki_pages',title));
        res.json({"msg":`The Title ${title} has been removed`})
    }
    else
    {
        res.json({"msg":`No Such ${title} Exists`})
    }
})

module.exports = router