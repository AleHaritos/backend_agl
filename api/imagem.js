module.exports = app => {

    const { validator } = app.config.validation

    const addImagem = (req, res) => {
        
        const objImagem = req.body

        try {
            validator(objImagem.idProduto, 'Está imagem não está relacionada a nenhum produto!')
            validator(objImagem.imagem, 'Está imagem está sem URL')
        }
        catch(msg) {
            return res.status(400).send(e)
        }

        app.db('img_produto')
            .insert(objImagem)
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))
    }

    const getImagensProduto = (req, res) => {
        // Aqui pega todas imagens do produto
        const idProd = req.params.id

        if(idProd) {
            app.db('img_produto')
            .where({idProduto: idProd})
            .then(imagens => res.json(imagens))
            .catch(e => res.status(500).send(e))
        }
        else {
            res.status(400).send('Está imagem não está relacionada a nenhum produto!')
        }
       
    }

    const getImagemProduto = (req, res) => {
        //Aqui pega uma unica imagem do produto
        const idProd = req.params.id

        if(idProd) {
            app.db('img_produto')
            .select('imagem')
            .where({ idProduto: idProd })
            .first()
            .then(imagem => res.json(imagem))
            .catch(e => res.status(500).send(e))
        }
        else {
            res.status(400).send('Está imagem não está relacionada a nenhum produto!')
        }
       
    }

    return { addImagem, getImagensProduto, getImagemProduto }
}