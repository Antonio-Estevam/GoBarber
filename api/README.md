# recuperação de senha

**Rf**
- O usuário deve poder recuperar senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- utilizae Mailtrap para testar envios em ambiente de dev;
- utilizar Amazom SES para envio em produção;
- O envio de e-mails deve acontecer em segundo planano (background job)

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**Rf**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# painel do prestador

**Rf**

**RNF**

**RN**

# Agendamento de serviços

**Rf**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;


**RNF**

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponível entre 8h ás 18h;
- O usuário não pode agendar um horário já oucupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviço consigo mesmo;


mapeando features 07:16


