module.exports = app => {
    const { validator } = app.config.validation

    const criarProduto = (req, res) => {

        const produto = req.body

        produto.nome = produto.nome[0].toUpperCase() + produto.nome.slice(1).toLowerCase()
        
        try {
            validator(produto.valor, 'o valor do produto está inválido')
            validator(produto.nome, 'o nome do produto está inválido')

        }
        catch(e) {
           return res.status(400).send(e)
        }

        app.db('produtos')
            .insert(produto)
            .returning('id')
            .then(id => res.json(id))
            .catch(e => res.status(500).send(e))
    }


    const getProduto = (req, res) => {
        const id = req.params.id

        if(!id) {
            return res.status(400).send('Id do produto não informado')
        }

        app.db('produtos')
            .where({ id: id, disponivel: true })
            .first()
            .then((produto) => res.json(produto))
            .catch((e) => res.status(500).send(e))
    }


    const getAll = (req, res) => {

        app.db('produtos')
            .where({ disponivel: true })
            .orderBy('id', 'asc')
            .then((produtos) => res.json(produtos))
            .catch((e) => res.status(500).send(e))
    }


    const getDestaques = (req, res) => {

        app.db('produtos')
            .where({ destaque: true, estoque: true, disponivel: true })
            .then(destaques => res.json(destaques))
            .catch(e => res.status(500).send(e))
    }

    const getPromocoes = (req, res) => {

        app.db('produtos')
            .where({ promocao: true, estoque: true, disponivel: true })
            .then(promocoes => res.json(promocoes))
            .catch(e => res.status(500).send(e))
    }


    const ajustes = (req, res) => {

        const produto = { ...req.body }

        app.db('produtos')
            .update({ 
                promocao: produto.promocao,
                destaque: produto.destaque,
                valorpromocao: produto.valorpromocao
            })
            .where({ id: produto.id, disponivel: true })
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))
    }


    const getLastId = (req, res) => {

        app.db('produtos')
            .where({ disponivel: true })
            .first()
            .orderBy('id', 'desc')
            .then((produto) => res.json(produto))
            .catch(e => res.status(500).send(e))
    }

    const deletar = (req, res) => {

        const id = req.params.id

        if(id) {
            app.db('produtos')
                .update({ disponivel: false })
                .where({ id: id })
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
        }
        else {
            res.status(400).send('Id não encontrado!')
        }
    }

    const getByIdProd = async (req, res) => {
        const limite = 6

        const page = req.query.page || 1

        const id = req.params.id

        // const result = await app.db('produtos')
        //                         .count('id')
        //                         .where({ idTipo: id, disponivel: true, estoque: true })
        //                         .first()

        // const count =  parseInt(result.count)

        app.db('produtos')
            .limit(limite).offset(page * limite - limite)
            .where({ idTipo: id, estoque: true, disponivel: true })
            .then((produtos) => res.json(produtos))
            .catch(e => res.status(500).send(e))
    }


    const getWhereLike = (req, res) => {

        const limite = 15

        const termo = req.body.termo

        if(termo !== '') {
            
            let filterWord = termo[0].toUpperCase() + termo.slice(1)

            app.db('produtos')
                .limit(limite)
                .where('nome', 'like', `%${filterWord}%`)
                .where({ disponivel: true })
                .then((produtos) => res.json(produtos))
                .catch((e) => res.status(500).send(e))
        }
        
    }

    const getWhereLikePage = (req, res) => {
        const page = req.query.page
        const limite = 6

        const termo = req.body.termo

        if(termo !== '') {
            
            let filterWord = termo[0].toUpperCase() + termo.slice(1)

            app.db('produtos')
                .limit(limite).offset(page * limite - limite)
                .where('nome', 'like', `%${filterWord}%`)
                .where({ disponivel: true })
                .then((produtos) => res.json(produtos))
                .catch((e) => res.status(500).send(e))
        }
        
    }


    const loadImage = (req, res) => {
        const image = req.body.imagem

        const id = req.params.id

        if(id) {
            app.db('produtos')
                .update({ url: image })
                .where({ id: id })
                .then(_ => res.status(204).send())
                .catch(e => e.status(500).send(e))
        } else {
           res.status(400).send()
        }
    }

    const getByNome = (req, res) => {

        const nome = req.body.nome

        app.db('produtos')
            .where({ nome: nome, disponivel: true })
            .first()
            .then((produto) => res.json(data = [produto]))
            .catch(e => res.status(500).send(e))

    }

    const getByIdDesc = (req, res) => {

        app.db('produtos')
            .where({ disponivel: true })
            .orderBy('id', 'desc')
            .then((produtos) => res.json(data =  produtos ))
            .catch(e => res.status(500).send(e))
    }


    return { criarProduto, getProduto, getAll, getDestaques, getPromocoes, ajustes, 
             getLastId, deletar, getByIdProd, getWhereLike, getByNome, getByIdDesc, loadImage, getWhereLikePage }
}