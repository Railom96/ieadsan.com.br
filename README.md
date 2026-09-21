# Site institucional da IEADSAN

Site estático publicado automaticamente no GitHub Pages, com atualização diária das cinco publicações mais recentes do Instagram oficial.

## Publicação no GitHub Pages

1. Envie estes arquivos para a branch `main` de um repositório GitHub.
2. Acesse **Settings → Pages** e escolha **GitHub Actions** como fonte de publicação.
3. Em **Custom domain**, informe `ieadsan.com.br`.
4. Ative **Enforce HTTPS** quando a opção estiver disponível.

O workflow `.github/workflows/deploy-pages.yml` publica o site em todo push para `main`, por acionamento manual e diariamente às 9h17 no horário de São Paulo.

## Feed do Instagram

Crie um aplicativo no painel Meta for Developers usando **Instagram API with Instagram Login** e conceda ao perfil profissional a permissão `instagram_business_basic`.

No repositório, acesse **Settings → Secrets and variables → Actions** e adicione:

- Secret `INSTAGRAM_ACCESS_TOKEN`: token de acesso da conta profissional.
- Secret `INSTAGRAM_USER_ID`: identificador numérico da conta profissional.
- Variable opcional `INSTAGRAM_API_VERSION`: versão da Graph API. O padrão atual do projeto é `v26.0`.

Nunca coloque o token em HTML, JavaScript público ou no histórico do Git.

## Domínio

No provedor DNS do domínio, configure os quatro registros `A` do domínio raiz conforme a documentação do GitHub Pages. Para `www`, use um registro `CNAME` apontando para `<usuario-ou-organizacao>.github.io`.
