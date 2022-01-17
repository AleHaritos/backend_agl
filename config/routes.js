module.exports = app => {

    app.route('/produtos')
        .post(app.api.produto.criarProduto)
        .get(app.api.produto.getAll)
        .put(app.api.produto.getWhereLike)

    app.route('/produtos/:id')
        .get(app.api.produto.getProduto)
        .delete(app.api.produto.deletar)

    app.get('/produtos-last', app.api.produto.getLastId)
    app.put('/produto-by-name', app.api.produto.getByNome)
    app.get('/produtos-desc', app.api.produto.getByIdDesc)

    app.post('/produtos-wherelike', app.api.produto.getWhereLikePage)

    app.route('/destaques')
        .get(app.api.produto.getDestaques)
        
    app.put('/ajustes', app.api.produto.ajustes)

    app.route('/promocoes')
        .get(app.api.produto.getPromocoes)
        
    app.put('/produtos-imagem/:id', app.api.produto.loadImage)

    app.route('/tipo_prod')
        .post(app.api.tipoProduto.criarTipoProduto)
        .get(app.api.tipoProduto.getTipoProd)


    app.route('/tipo_prod/:id')
        .get(app.api.produto.getByIdProd)    

    app.get('/estoque/:id', app.api.estoque.estoqueById)

    app.get('/estoque-produto/:id', app.api.estoque.estoqueByIdProduto)
        
    app.route('/estoque')
        .post(app.api.estoque.atualizarEstoque)
        .put(app.api.estoque.reduzirEstoque)

    app.put('/verificar-estoque', app.api.estoque.verificarEstoque)

    app.post('/img_produto', app.api.imagem.addImagem)
    app.get('/img_produto/:id', app.api.imagem.getImagensProduto)
    app.get('/img_produto_unico/:id', app.api.imagem.getImagemProduto)


    app.put('/cep', app.api.correios.consultar)
    app.put('/frete', app.api.correios.calcularFrete)
    

    app.put('/verificacao', app.api.vendas.verificacaoEstoque)
    app.post('/pagamento', app.api.vendas.pagamentoPaypal)

    app.put('/subtrair-estoque', app.api.estoque.subtrairEstoque)
    app.put('/back-estoque', app.api.estoque.backItem)

    app.get('/success', app.api.vendas.success)
    app.get('/cancel', app.api.vendas.cancel)

    app.route('/vendas')
         .post(app.api.vendas.cadastrarVenda)
         .get(app.api.vendas.getVendas)

    app.get('/vendas/:id', app.api.vendas.getVendasByIdPedido)     
    app.get('/vendas-usuario/:id', app.api.pedidos.getPedidosByIdUsuario)     


    app.route('/pedidos')
        .post(app.api.pedidos.cadastrarPedidos)
        .get(app.api.pedidos.getPedidos)


    app.get('/pedidos-desc', app.api.pedidos.getPedidosDesc)

    app.route('/usuario')
        .post(app.api.usuario.signUp)    
        .put(app.api.usuario.signIn)    

    app.post('/usuario-admin', app.api.usuario.getAdmin)
    app.post('/get-usuario', app.api.usuario.getIdByEmail)
}