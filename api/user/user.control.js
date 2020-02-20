const models = require('../../models')

const showList = async (req, res, next) => {
    req.query.limit = req.query.limit || 10
    const limitNum = parseInt(req.query.limit);
    if(!limitNum) {
        return res.status(400).send()
    }
    else {
        const users = await models.User.findAll({ offset: 0, limit: limitNum })
        return res.json(users)
    }
}

const showOne = async (req, res, next)=>{
    const id = parseInt(req.params.id)

    if (!id) {
        res.statusCode = 400
        return res.send()
    }
    const user = await models.User.findOne({
        where: {
            id: id
        }
    })

    if(!user) {
        return res.status(404).end()
    }
    res.json(user)
}

const remove = async(req, res, next)=>{
    const id = parseInt(req.params.id)

    if (!id) {
        return res.status(400).end()
    }

    const finded = await models.User.findOne({
        where: {
            id: id
        }
    });
    if(finded === null) {
        return res.status(404).end()
    } else {
        await models.User.destroy({
            where: {
                id: id
            }
        });
        return res.status(204).end()
    }
}

const add = (req, res, next) => {
    const name = req.body.name

    if(!name) {
        return res.status(400).end()
    }

    models.User.findOrCreate({
        where: { name: name },
        defaults: {
          name: name
        }
    })
    .spread((memo, created) => {
        if (created) {
            return res.status(201).json(memo.dataValues)
        } else {
            return res.status(409).end()
        }
    });

}

const modify = (req, res, next) => {
    const id = parseInt(req.body.id)
    const name = req.body.name
    if(!id || !name) {
        return res.status(400).end()
    }

    models.User.update(
        {name: name}, 
        {where: {id: id}}
        ).then(result => {
                if (result[0] == 0) {
                    return res.status(404).end()
                } else {
                    return res.status(200).json({id, name})
                }
            })
}

module.exports = {
    showOne, showList, remove, add, modify
}