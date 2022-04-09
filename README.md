COMO RODAR O PROJETO BAIXADO
Instalar todas as dependências indicadas no package.json
### npm i -y / yarn init -y

Rodar o projeto usando nodemon
### npm start 

Neste projeto foi utilizado apenas EXPRESS e NODEMON como módulos externos
para criar ID dinamicamente foi utilizado o randomUUID() do core module do NODE
ou seja foi utilizado o modulo interno crypto que esta disponível a partir do node 15.x
caso queira instalar em outro projetos.
### basta importar com const { randomUUID } = require('crypto')

Para armazenar as informações foi utilizado outro core module do node o 
fs (file system) que cria um arquivo json na raiz com as informações inseridas.
Assim no reload do servidor não são perdidas as informações armazenadas, uma vez 
que não estamos utilizando nenhum DB.

### Basta importar com const fs = require('fs')

Também estou utilizando uma extensão do VScode que faz os requests HTTP tudo para 
não ter que sair da interface do editor de código.
### REST Client
Utilização: basta criar um arquivo com a extensão http na raiz do projeto.
No interior do  arquivo tem a seguinte sintaxe.

Para criar um request GET
Escreva GET e coloque http://localhost:port/rota

Entre uma request e outra colocar ### e pular linhas

Para criar um request GET com ID
Escreva GET e coloque http://localhost:port/rota/ID

Para criar um request POST
Escreva POST http://localhost:port/rota
Content-Type: application/json  
Para informar qual formato vai no corpo da requisição

{
  formato json
}

Para criar um request PUT
Escreva PUT http://localhost:port/rota/ID
Content-Type: application/json

{
  formato json
}

Para criar um request Delete
Escreva Delete http://localhost:port/rota/ID
 