export const signUp = async (req, res) => {

  const { name, email, password, confirmPassword } = req.body

  try {

    // if(email existir no banco) return res.status(409).send('e-mail já cadastrado!')

    //tudo certo? cadastrar usuário no banco
    // res.sendStatus(201)

    res.sendStatus(201)
    
  } catch (error) {
    res.status(500).send(error)
  }
}

export const signIn = async (req, res) => {

  const { email, password } = req.body;

  try {

    //procurar e-mail no banco
    // não existe? res.sendStatus(401)
    // existe ? pega o usuário do banco e atribui em uma nova variável (user)

    //user.password descriptada não é igual a password? res.sendStatus(401)
    //user.password descriptada é igual a password? segue em frente

    //se baterem
    //gerar novo token
    //enviar token para o banco de dados
    // res.status(200).send(token)
    
  } catch (error) {
    res.status(500).send(error)
  }
}