module.exports = app => {
    
const cadastrarPedidos = (req, res) => {
    const pedido = req.body

    if(pedido) {

        app.db('pedidos')
            .insert(pedido)
            .returning('id')
            .then(pedido => res.json(pedido))
            .catch(e => res.status(500).send(e))

    } else {
        res.status(400).send('Pedido inválido')
    }
}

const getPedidos = (req, res) => {

     app.db('pedidos')
        .then(pedidos => res.json(pedidos))
        .catch(e => res.status(400).send(e))
}

const getPedidosDesc = (req, res) => {

    app.db('pedidos')
        .orderBy('id', 'desc')
        .then(pedidos => res.json(pedidos))
        .catch(e => res.status(400).send(e))
}

const getPedidosByIdUsuario = async (req, res) => {

    
    const id = req.params.id

     app.db('pedidos')
          .select('id')
          .where({ idUsuario: id })
          .then(ids => res.json(ids))
          .catch(e => res.status(500).send(e))

    }           


return { cadastrarPedidos, getPedidos, getPedidosDesc, getPedidosByIdUsuario }

}