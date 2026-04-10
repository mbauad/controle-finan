# FinControl - Gestor Financeiro com CRUD Completo

## 📋 Funcionalidades

✅ **Criar** - Cadastrar novas transações (receitas e despesas)  
✅ **Ler** - Visualizar todas as transações  
✅ **Atualizar** - Editar transações já criadas  
✅ **Deletar** - Remover transações  

## 🎯 Outras Funcionalidades

- 📊 Dashboard com resumo financeiro
- 📈 Gráficos de receitas e despesas
- 📋 Relatórios por categoria
- 💳 Gerenciador de transações com filtros
- 🎨 Interface moderna com tema escuro
- 📱 Responsivo para celular e desktop

## 🚀 Como Compilar

### Pré-requisitos
- Java 11 ou superior
- Maven 3.6+

### Passos para Compilar

```bash
cd /home/marcelo/Documentos/fincontrol/fincontrol-src

# Compilar o projeto
mvn clean package -DskipTests

# O arquivo JAR será gerado em: target/fincontrol-1.0.0.jar
```

## ▶️ Como Executar

### Opção 1: Usar o Maven Directly
```bash
mvn spring-boot:run
```

### Opção 2: Usar o JAR compilado
```bash
java -jar target/fincontrol-1.0.0.jar
```

### Opção 3: Usar Script (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

## 🌐 Acessar a Aplicação

Após iniciar, acesse em seu navegador:

```
http://localhost:8080
```

## 📚 Estrutura do Projeto

```
fincontrol-src/
├── src/main/java/com/fincontrol/
│   ├── FincontrolApplication.java       # Aplicação Principal
│   ├── controller/
│   │   ├── PageController.java          # Controlador de páginas HTML
│   │   └── ApiRestController.java       # API REST (CRUD)
│   ├── entity/
│   │   └── Transaction.java             # Modelo de dados
│   ├── repository/
│   │   └── TransactionRepository.java   # Acesso ao banco de dados
│   └── service/
│       └── TransactionService.java      # Lógica de negócio
├── src/main/resources/
│   ├── templates/
│   │   ├── dashboard.html               # Página inicial
│   │   ├── transactions.html            # Gerenciador de transações
│   │   └── report.html                  # Relatórios
│   ├── static/
│   │   ├── css/style.css                # Estilos
│   │   └── js/app.js                    # JavaScript do cliente
│   └── application.properties           # Configuração da app
└── pom.xml                              # Dependências Maven
```

## 🔧 Endpoints da API

### Criar Transação
```http
POST /api/transactions
Content-Type: application/json

{
  "type": "income",
  "description": "Venda de produto",
  "value": 1500.00,
  "date": "2026-04-10",
  "category": "Vendas",
  "notes": "Venda pelo site"
}
```

### Listar Todas as Transações
```http
GET /api/transactions
```

### Obter Uma Transação
```http
GET /api/transactions/{id}
```

### Editar Transação
```http
PUT /api/transactions/{id}
Content-Type: application/json

{
  "type": "income",
  "description": "Venda de produto atualizada",
  "value": 2000.00,
  "date": "2026-04-10",
  "category": "Vendas",
  "notes": "Nota atualizada"
}
```

### Deletar Transação
```http
DELETE /api/transactions/{id}
```

## 📊 Campos da Transação

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | UUID | Não | Gerado automaticamente |
| type | String | Sim | "income" ou "expense" |
| description | String | Sim | Descrição da transação |
| value | Double | Sim | Valor em reais |
| date | LocalDate | Sim | Data da transação |
| category | String | Sim | Categoria (ex: Vendas, Alimentação) |
| notes | String | Não | Observações adicionais |
| createdAt | DateTime | Não | Data/hora de criação (automática) |

## 💾 Banco de Dados

A aplicação usa **H2 Database** (em memória com persistência em arquivo):

- **Localização dos dados**: `./data/fincontrol.mv.db`
- **Console H2**: http://localhost:8080/h2-console
- **Usuário**: `sa`
- **Senha**: (deixe em branco)

## 🎨 Temas Disponíveis

A aplicação usa tema escuro por padrão com as cores:
- 🎭 Background: `#0f1419`
- 💳 Cards: `#1a1f2e`
- 📝 Texto: `#e0e0ff`
- 🎨 Primária: `#6366f1` (Roxo)
- 🟢 Receita: `#00b894` (Verde)
- 🔴 Despesa: `#ff6b6b` (Vermelho)

## 🐛 Troubleshooting

### Porta 8080 já está em uso
```bash
# Linux/Mac: Matar o processo
lsof -ti:8080 | xargs kill -9

# Windows: Usar outra porta
java -jar target/fincontrol-1.0.0.jar --server.port=8081
```

### Erro ao compilar com Maven
```bash
# Limpar cache Maven
mvn clean

# Recompile
mvn package -DskipTests
```

### Banco de dados corrompido
```bash
# Deletar arquivo de banco e recriá-lo
rm -rf data/fincontrol.mv.db
```

## 📝 Licença

Projeto de código aberto - Livre para usar e modificar.

## 👨‍💻 Desenvolvedor

Desenvolvido como exemplo de aplicação CRUD completa com Spring Boot.
