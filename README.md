# Site institucional da IEADSAN

Site institucional estático publicado automaticamente no GitHub Pages.

## Publicação no GitHub Pages

1. Envie estes arquivos para a branch `main` de um repositório GitHub.
2. Acesse **Settings → Pages** e escolha **GitHub Actions** como fonte de publicação.
3. Em **Custom domain**, informe `ieadsan.com.br`.
4. Ative **Enforce HTTPS** quando a opção estiver disponível.

O workflow `.github/workflows/deploy-pages.yml` publica o site em todo push para `main` e também pode ser acionado manualmente.

## Domínio

No provedor DNS do domínio, configure os quatro registros `A` do domínio raiz conforme a documentação do GitHub Pages. Para `www`, use um registro `CNAME` apontando para `<usuario-ou-organizacao>.github.io`.
