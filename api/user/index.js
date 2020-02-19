const express = require('express')
const router = express.Router()
const cb = require('./user.control')



router.get('/', cb.showList)

router.get('/:id', cb.showOne)

router.delete('/:id', cb.remove)

router.post('/', cb.add)

router.put('/', cb.modify)

module.exports = router