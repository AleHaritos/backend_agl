module.exports = app => {

    const { validator } = app.config.validation

    const estoqueById = (req, res) => {
        const id = req.params.id

        app.db('estoque')
            .where({ id: id })
            .first()
            .then(estoque => res.json(estoque))
            .catch(e => res.status(500).send(e))
    }


    const estoqueByIdProduto = (req, res) => {

        const idProduto = req.params.id

        app.db('estoque')
            .where({ idProduto: idProduto })
            .whereRaw('quantidade > ?', [0])
            .then(estoque => res.json(estoque))
            .catch(e => res.status(500).send(e))
    }


    const atualizarEstoque = async (req, res) => {

        const estoque = req.body

        try {
            validator(estoque.quantidade, 'A quantidade está inválida')
            validator(estoque.tamanho, 'O tamanho está inválido')

        }catch(e) {
            res.status(400).send(e)
        }


        const exists = await app.db('estoque')
                            .where({ tamanho: estoque.tamanho, 
                                     idProduto: estoque.idProduto})
                            .first()


        await app.db('produtos')
                    .update({ estoque: true})
                    .where({ id: estoque.idProduto})
                            
        if(exists) {
            // para nao concatenar
            const soma =  exists.quantidade - -estoque.quantidade

            app.db('estoque')
                .update({ quantidade: soma })
                .where({  idProduto: estoque.idProduto, tamanho: estoque.tamanho })
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
        }
        else {
            app.db('estoque')
                .insert(estoque)
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
        }
    }

    const reduzirEstoque = async (req, res) => {

        const estoque = req.body

        try {
            if(estoque.quantidade < 0) {
                throw 'Quantidade inválida'
            }

        }catch(e) {
            res.status(400).send(e)
        }


        const exists = await app.db('estoque')
                            .where({ tamanho: estoque.tamanho, 
                                     idProduto: estoque.idProduto})
                            .first()


                            
        if(exists) {
            
            let subtracao =  exists.quantidade - estoque.quantidade

            if(subtracao <= 0) {
                app.db('estoque')
                .update({ quantidade: 0 })
                .where({  idProduto: estoque.idProduto, tamanho: estoque.tamanho })
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
            } else {

                app.db('estoque')
                .update({ quantidade: subtracao })
                .where({  idProduto: estoque.idProduto, tamanho: estoque.tamanho })
                .then(_ => res.status(204).send())
                .catch(e => res.status(500).send(e))
            }
            

           
        }
        else {
            res.status(400).send('Não existe este estoque')
        }
    }


 const verificarEstoque = (req, res) => {

    const id = req.body.idProduto

   
         app.db('produtos')
            .update({ estoque: false})
            .where({ id: id })
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))
            
    }
            
    
    const subtrairEstoque = async (req, res) => {
        const produto = req.body

        if(produto) {

            const estoque = await app.db('estoque')
                                  .where({ idProduto: produto.idProduto, tamanho: produto.tamanho })
                                  .first()


            app.db('estoque')
            .update({ quantidade: estoque.quantidade - produto.quantidade })
            .where({ idProduto: produto.idProduto, tamanho: produto.tamanho })
            .then(_ => res.status(204).send())
            .catch((e) => res.status(500).send(e))

        }
       
    }


    const backItem = async (req, res) => {
        const produto = req.body

        if(produto){

            const estoque = await app.db('estoque')
                                  .where({ idProduto: produto.idProduto, tamanho: produto.tamanho })
                                  .first()


            app.db('estoque')
            .update({ quantidade: estoque.quantidade + produto.quantidade })
            .where({ idProduto: produto.idProduto, tamanho: produto.tamanho })
            .then(_ => res.status(204).send())
            .catch((e) => res.status(500).send(e))
        }
        

    }

    return { estoqueById, atualizarEstoque, estoqueByIdProduto, reduzirEstoque, verificarEstoque, subtrairEstoque, backItem }
}