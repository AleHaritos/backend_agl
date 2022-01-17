module.exports = app => {

    const { validator } = app.config.validation

    const criarTipoProduto = (req, res) => {

        const tipoProd = {...req.body}

        try {
            validator(tipoProd.descricaoTipo, 'O tipo do produto está inválido')
        }catch(e) {
            return res.status(400).send(e)
        }

        tipoProd.descricaoTipo = tipoProd.descricaoTipo[0].toUpperCase() + tipoProd.descricaoTipo.slice(1).toLowerCase()

        app.db('tipo_prod')
            .insert(tipoProd)
            .then((_) => res.status(204).send())
            .catch((e) => res.status(500).send(e))
    }



    const getTipoProd = (req, res) => {

        app.db('tipo_prod')
            .orderBy('descricaoTipo', 'asc')
            .then(tipos => res.json(tipos))
            .catch(e => res.status(500).send(e))
    }

    return { criarTipoProduto, getTipoProd }
}