const app = require('../index')
const port = 3000
const models = require('../models')

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)

    await models.sequelize.sync({force:true})
        .then(() => {
            console.log('DB Syncro')
            
        })
})