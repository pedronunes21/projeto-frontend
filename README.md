
# Projeto de Software - Frontend
Matéria de Projeto de Software na UEPG

## Como Rodar
O requisito para rodar essa aplicação é ter o Node 18 instalado

Para rodar, basta baixar o projeto e rodar o seguinte comando na pasta raiz

```http
npm i
```

Esse comando irá instalar as bibliotecas necessárias

Após isso, para iniciar a aplicação utilize o comando

```http
npm run dev
```

O URL para o backend fica na pasta `src/service/api.ts`. Quando iniciar o backend, verifique a porta que ele será iniciado. A porta padrão é 3000.

## TO-DO

[] Cadastrar dados reais no sistema
[] Fazer vídeo tutorial de como usar o sistema

[x] Mudar ícone de fazer check-in
[x] Adicionar label em cada input
[x] Adicionar modal de confirmação para exclusão
[x] Trocar o ícone de mais pelo check
[x] Página de controle do admin, para ver quem está inscrito em cada aula, além de poder marcar presença dos alunos.
[x] Adicionar campo de presença no agendamento (boolean), default false, professor marca se aluno participou da aula
[x] Adicionar calendário onde admin pode verificar todas as aulas e quais alunos participaram da aula (histórico de participações em aulas)
[x] Gerar relatório de presença por aluno e por aula (falta colocar presença do aluno na tabela)
[x] Quando um usuário efetuar “check in” em uma aula, desabilitar o “check in” nas demais, que conflitem o horário.
[x] Adicionar calendário para ver as aulas que não são do dia de hoje
[x] Poder marcar presença em qualquer aula da semana
[x] Transformar itens em carrousel
[x] Criar um Help de Contexto ( pra cada seção aparecer uma ajuda de como usar a parte específica do sistema )


