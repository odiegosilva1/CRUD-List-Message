# Project Name

## Description

Briefly describe your project here.

## Instalação

Para instalar as dependências necessárias para este projeto, siga estes passos:

1. Clone o repositório: `git clone https://github.com/seu/repositorio.git`
2. Navegue até o diretório do projeto: `cd pasta-do-projeto`
3. Instale as dependências: `npm install` ou `yarn install`

## Endpoints

### Obter Dados do Usuário

- **Endpoint:** `/users`
- **Método:** GET
- **Descrição:** Recupera dados de todos os usuários.
- **Parâmetros:** Nenhum
- **Resposta:** Objeto JSON contendo dados do usuário.

### Editar Mensagem do Usuário

- **Endpoint:** `/users/:userId/messages/:messageId`
- **Método:** PUT
- **Descrição:** Edita uma mensagem específica de um usuário.
- **Parâmetros:**
  - `userId`: ID do usuário
  - `messageId`: ID da mensagem
- **Corpo da Requisição:** Objeto JSON contendo dados da mensagem modificada com o seguinte formato:

```
json
{
  "id": "messageId",
  "title": "Novo Título",
  "description": "Nova Descrição"
}

```