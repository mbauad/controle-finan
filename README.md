# FinControl

Sistema de controle financeiro pessoal, desenvolvido em Spring Boot + Java 11 + H2 + HTML/CSS/JS.

## Funcionalidades
- Cadastro, edição e exclusão de transações
- Dashboard com resumo financeiro
- Relatórios e gráficos
- Sugestão e gerenciamento de descrições/categorias
- Interface responsiva e moderna

## Como rodar localmente

```bash
# Requisitos: Java 11+ e Maven
mvn clean package
java -jar target/fincontrol-1.0.0.jar
```
Acesse: http://localhost:8080

## Estrutura do Projeto
- `src/main/java/com/fincontrol/` - Código Java (controllers, services, entities)
- `src/main/resources/templates/` - Templates HTML (Thymeleaf)
- `src/main/resources/static/` - CSS e JS
- `src/main/resources/application.properties` - Configuração do banco H2

## Banco de Dados
- H2 em arquivo local (`./data/fincontrol.mv.db`)
- Console H2: http://localhost:8080/h2-console

## Deploy
- O projeto pode ser facilmente deployado em qualquer serviço Java (Azure, Heroku, VPS, etc)

## CI/CD (Exemplo GitHub Actions)
Veja o arquivo `.github/workflows/maven.yml` para build automático.

---

Desenvolvido por Marcelo Bauad
