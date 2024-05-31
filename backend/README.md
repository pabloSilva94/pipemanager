## Configurações no Supabase
1. Crie as seguintes tabelas:
     1. users: id:PK, name, password, adm
     2. tasks: id:PK, title, description, status, date, time, customers_id:FK, user_id:FK, group_id:FK, type_sys, type_inst, commits: JSON, owner
     3. customers: id:PK, name, phone, cnpj, cpf, address, user_id:FK
     4. providers:  id:PF, name, email, password, user_id:FK, active, group_id:FK
     5. group: id:PK, title, code_group, user_id:FK 

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/pabloSilva94/pipemanager.git
2. Entre no projeto:
   ```bash
   cd pipemanager/backend
3. Instale as dependencias
   ```bash
   npm i
4. Crie um .env
    - PORT
    - SUPABASE_URL
    - SUPABASE_KEY

. Execultado o projeto
   ```bash
   npm run dev
