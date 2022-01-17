module.exports = app => {

    const { calcularPrecoPrazo, consultarCep, rastrearEncomendas } = require('correios-brasil')

const consultar = (req, res) => {

    const cep = req.body.cep

    if(cep) {
        consultarCep(cep)
        .then(response => {
            res.json(response)
        })
    }
    else {
        res.status(400).send('Cep não informado')
    }
   
   
}

const calcularFrete = (req, res) => {

    const cep = req.body.cep
    

    let args = {
        
        sCepOrigem: '12914-180',
        sCepDestino: cep,
        nVlPeso: '0.5',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '10',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'], 
        nVlDiametro: '0'
    
      };
      
      if(cep) {

           calcularPrecoPrazo(args)
                .then((response) => {
                  res.json(response)
              });
        }
          
      else {
          res.status(400).send('Cep não preenchido')
      }
      
} 



return { consultar, calcularFrete }

}