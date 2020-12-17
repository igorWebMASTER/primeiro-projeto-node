# Projeto Node com Typescript

Aplicação Node com Typescript

# Recuperação de senha

**RF**

-   O usuário deve poder recuperar sua senha informando o seu e-mail;
-   O usuário deve receber um e-mail com instruções de recuperação de senha;
-   O usuário deve poder resetar sua senha;

**RNF**

-   Utilizar mailtrap para testar envios em ambiente de desenvolvimento;
-   Utilizar Amazon SES para envios em produção;
-   O envio de e-mails deve acontecern em segundo plano(Background job);

**RN**

-   O link enviado por email para resetar senha, deve expirar em 2h;
-   O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

-   O usuário deve poder atualizar seu perfil, nome, email e senha;

**RNF**

**RN**

-   O usuário não pode alterar seu email para um email já atualizado;
-   Para atualizar sua senha, o usuário deve informar a senha antiga;
-   Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

# Agendamento de serviços

**RF**

-   O usuário deve poder listar todos prestadores de serviços cadastrados;
-   O usuário deve poder listar os dias de um mes com pleno menos um horário disponível de um prestador;
-   O usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
-   O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

**RN**

-   Cada agendamento deve durar 1h exatamente;
-   Os agendamento devem estar disponíveis entre as 8h e 18h (Primeiro, as 8h, último as 17h);
-   Os usuários não pode agendar um horário já ocupado;
-   O usuário não pode agendar em um
