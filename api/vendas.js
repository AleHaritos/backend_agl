module.exports = app => {

    const paypal = require('paypal-node-sdk')

    const verificacaoEstoque = async (req, res) => {
        const produto = req.body

      const estoque = await app.db('estoque')
             .where({ idProduto: produto.idProduto, tamanho: produto.tamanho })

    if(estoque) {
        estoque.forEach(e => {
        
            if(e.quantidade < produto.quantidade) {
                res.json('Não Verificado')

            }
        
            if(e.quantidade >= produto.quantidade) {
               res.json('Verificado')
            }

        })

    }
    else {
        res.status(400).send('Não foi encontrado no estoque')
    }
    
    }



const pagamentoPaypal = (req, res) => {

    paypal.configure({
        'mode': 'sandbox',
        'client_id': 'AdW-VhEgD5Y8U8Cot9hKRnUzRa_oWshpbnlm0h6dJ7RUcxHblTbxRduLaulRwnpe7uRH6TLUwgsLPzty',
        'client_secret': 'EMdULVAlVnYSoQ5cqVC-lycMJUumxrm7yIFuqyHLzv9clT6JXO_WLpBlp_iirlcrdWrm3_ge76sybGPh'
    })

    const carrinho = req.body.carrinho
    const total = req.body.valorTotal
    
    
if(carrinho) {


    let newPayment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://aglcompany.herokuapp.com/success",
            "cancel_url": "https://aglcompany.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": carrinho
            },
            "amount": {
                "currency": "BRL",
                "total": total
            },
            "description": "AGL Company"
        }]
    };


    paypal.payment.create(newPayment, (error, pagamento) => {
        if(error) {
            console.warn(error)
        }

        else {
            pagamento.links.forEach((link) => {
                if(link.rel === 'approval_url') {
                    res.json(link.href)
                }
            })
        }
    })
}
    
}



const success = (req, res) => {
    // const url = process.env.DB_ENV === 'development' ? 'http://localhost:4200/success' : 'https://aglcompany.herokuapp.com/success'
    res.redirect('https://aglcompany.herokuapp.com/success')
}

const cancel = (req, res) => {
    // const url = process.env.DB_ENV === 'development' ? 'http://localhost:4200/cancel' : 'https://aglcompany.herokuapp.com/cancel'
    res.redirect('https://aglcompany.herokuapp.com/cancel')
}



const cadastrarVenda = (req, res) => {

    const venda = req.body

    if(venda) {

    app.db('vendas')
        .insert(venda)
        .then(_ => res.status(204).send())
        .catch(e => res.status(400).send(e))

    } else {
        res.status(400).send('Venda inválida')
    }

}

const getVendas = (req, res) => {

    app.db('vendas')
        .then(vendas => res.json(vendas))
        .catch(e => res.status(400).send(e))

}


const getVendasByIdPedido = (req, res) => {

    const id = req.params.id

    if(id){
    app.db('vendas')
        .select('vendas.tamanho', 'vendas.quantidade', 'produtos.nome', 'pedidos.data')
        .innerJoin('produtos', 'vendas.idProduto', '=', 'produtos.id')
        .innerJoin('pedidos', 'vendas.idPedido', '=', 'pedidos.id')
        .where({ idPedido: id })
        .then(vendas => res.json(vendas))
        .catch(e => res.status(400).send(e))
    }
    else {
        res.status(400).send('Parâmetro id não encontrado')
    }
}


    return { verificacaoEstoque, pagamentoPaypal, success, cancel, cadastrarVenda, getVendas, getVendasByIdPedido }
}