# 🎨 Gerador de Wallpapers Delaunay (Low Poly Art)

Um gerador de arte geométrica e papéis de parede baseados em **Triangulação de Delaunay** com renderização 3D facetada, gradientes dinâmicos e exportação instantânea.

Feito em **HTML5, CSS3 e JavaScript puro**, pronto para rodar diretamente no **GitHub Pages** sem precisar de nenhum build ou instalação!

---

## 🚀 Como hospedar no GitHub Pages (Passo a Passo)

1. Crie um novo repositório no seu GitHub (exemplo: `delaunay-wallpaper` ou `delunay`).
2. Envie todos os arquivos deste projeto para a branch principal (`main`):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
3. No seu repositório no GitHub:
   - Vá em **Settings** > **Pages** (no menu lateral esquerdo).
   - Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` e a pasta `/(root)`.
   - Clique em **Save**.
4. Pronto! Em menos de 1 minuto seu site estará online em:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

---

## ✨ Funcionalidades

- **🎲 Botão Random**: Gera um novo padrão com cores, iluminação 3D e geometria únicas a cada clique.
- **🖱️ Copiar Imagem com o Botão Direito**: Como a arte é exportada diretamente em uma tag `<img>`, você pode clicar com o **botão direito em qualquer lugar da tela e selecionar "Copiar imagem"** ou "Salvar imagem como...".
- **📋 Botão Copiar Imagem**: Atalho que copia diretamente para a área de transferência do sistema operacional.
- **💾 Botão Baixar PNG**: Salva o arquivo `.png` com um clique.
- **🖥️ Seleção de Resolução**:
  - Tela Atual (Automático)
  - 1080p Full HD (1920x1080)
  - 2K QHD (2560x1440)
  - 4K Ultra HD (3840x2160)
  - Celular / Story (1080x1920)
  - Quadrado (1440x1440)
- **🎨 Mais de 14 Paletas Curadas + Gerador Algorítmico Harmônico**: Sunset, Cyberpunk, Nordic Glacier, Rainforest Emerald, Dark Obsidian, etc.
- **⌨️ Atalhos de Teclado**:
  - `Espaço`: Gerar novo wallpaper aleatório
  - `C`: Copiar imagem
  - `S`: Baixar imagem PNG
  - `H`: Ocultar / Mostrar painel de controles
