module.exports = app => {
    const { validator } = app.config.validation
    const bcryptjs = require('bcrypt-nodejs')

    const signUp = async(req, res) => {

        const usuario = req.body

        const existUser = await app.db('usuarios')
                                .where({ email: usuario.email })
                                .first()

        if(existUser) {
            res.status(400).send('Email já cadastrado')
        } else {


        try {
            validator(usuario.nome, 'Usuário não informado')
            validator(usuario.email, 'Email não informado')
            validator(usuario.senha, 'Senha não identificada')
            validator(usuario.senha2, 'Senha não identificada')
        }
        catch(e) {
            res.status(400).send(e)
        }



        if(usuario.senha === usuario.senha2) {
            //Criptografar senha antes de inserir no BD
            const salt = bcryptjs.genSaltSync(11)
            usuario.senha = bcryptjs.hashSync(usuario.senha, salt)

            //Deletar senha de confirmação
            delete usuario.senha2

            app.db('usuarios')
            .insert(usuario)
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send(e))
        }
        else {
            res.status(400).send('Senhas incompatíveis')
        }
    }
    }

    const signIn = async (req, res) => {

        const usuario = req.body
       
        if(usuario) {
         const getUsuario = await app.db('usuarios')
                                     .select('senha')
                                     .first()
                                     .where({ email: usuario.email })
                         
         if(getUsuario) {
            const match = bcryptjs.compareSync(usuario.senha.toString(), getUsuario.senha)
            
            if(match) {
                res.json({ validacao: true })
            } else {
               res.status(400).send('Senha inválida')
            }

         } else {
             res.status(400).send('Email não encontrado')
         }
                                     
        }
          else {
            res.status(400).send('Usuário inválido')
        }

    }

    const getAdmin = (req, res) => {
        const email = req.body.email
        if(email) {
            app.db('usuarios')
                .select('admin')
                .where({ email: email })
                .first()
                .then(admin => res.json(admin))
                .catch(e => res.status(500).send(e))
        } else {
            res.status(400).send('Email não identificado')
        }
    }


   const getIdByEmail = (req,res) => {
       const email = req.body.email

       if(email) {
        app.db('usuarios')
            .select('id')
            .where({ email: email })
            .first()
            .then(id => res.json(id))
       }
       else {
           res.json(null)
       }
   }

    return { signUp, signIn, getAdmin, getIdByEmail }
}