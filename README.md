# Rick & Morty API CRUD

Este projeto é uma aplicação front-end desenvolvida com Angular, TypeScript e Jest, com o objetivo de realizar operações CRUD (Create, Read, Update, Delete) utilizando os dados da famosa [API pública do Rick and Morty](https://rickandmortyapi.com/). A aplicação permite visualizar personagens e editar, adicionar.

## 🔍 Sobre o Projeto

A ideia principal por trás deste projeto é oferecer uma interface interativa para gerenciar personagens do universo Rick and Morty. Embora a API original não permita persistência de dados (por ser apenas leitura), foi simulado as operações de criação, atualização e exclusão no front-end com base nas práticas modernas de desenvolvimento em Angular. O projeto também serve como base para aprendizado e prática com testes unitários usando **Jest**, reforçando boas práticas em testes automatizados.

## ⚙️ Tecnologias Utilizadas

- **Angular 18** — Framework principal para construção da aplicação SPA
- **TypeScript** — Linguagem fortemente tipada para maior robustez do código
- **Jest** — Testes unitários modernos com cobertura prática e rápida
- **RxJS** — Manipulação de fluxos assíncronos e reatividade
- **SCSS** — Estilização modular e flexível
- **API Rick and Morty** — Fonte dos dados dos personagens

## 🚀 Como Rodar o Projeto

Certifique-se de ter o Node.js instalado (versão recomendada 18+)

### 1. Clone o repositório

```bash
git clone https://github.com/marcosvmgil/desafio-angular.git
cd rick-and-morty-crud
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode a aplicação em modo desenvolvimento

```bash
npm run start
```

Acesse `http://localhost:4200` no navegador para ver o app em ação.

### 4. Rode os testes unitários

```bash
npm run test
```

Você verá os resultados no console, juntamente com a cobertura dos testes.

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── pages/
│   └── app.module.ts
├── assets/
├── environments/
└── index.html
```

## 🧪 Testes

Os testes são escritos com Jest e visam garantir que os componentes, serviços e fluxos principais estejam funcionando corretamente. Isso ajuda a prevenir regressões e aumenta a confiabilidade do projeto conforme ele evolui.

## 🤝 Contribuições

Este projeto é voltado para estudo, mas sugestões, melhorias e PRs são muito bem-vindos. Se você encontrou um bug ou tem uma ideia legal para melhorar a aplicação, sinta-se à vontade para abrir uma *issue* ou mandar um *pull request*.

## 🛸 Créditos

- Personagens e dados obtidos da API: [https://rickandmortyapi.com](https://rickandmortyapi.com)
- Ícones e imagens do universo Rick and Morty são propriedade de seus respectivos criadores.

---
