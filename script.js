/**
 * Delaunay Wallpaper Generator
 * Gerador de wallpapers geométricos low-poly em puro HTML5/Canvas/JS
 */

(function () {
  'use strict';

  // --- Elementos do DOM ---
  const container = document.getElementById('container');
  const wallpaperImg = document.getElementById('wallpaper-img');
  const canvas = document.getElementById('render-canvas');
  const ctx = canvas.getContext('2d');

  const btnRandom = document.getElementById('btn-random');
  const btnCopy = document.getElementById('btn-copy');
  const btnDownload = document.getElementById('btn-download');
  const btnTogglePanel = document.getElementById('btn-toggle-panel');
  const btnShowPanel = document.getElementById('btn-show-panel');
  const uiPanel = document.getElementById('ui-panel');
  const paletteBadge = document.getElementById('palette-badge');
  const feedbackToast = document.getElementById('feedback-toast');
  const toastText = document.getElementById('toast-text');
  const hintText = document.getElementById('hint-text');

  // Idioma
  const btnLang = document.getElementById('btn-lang');
  const langFlag = document.getElementById('lang-flag');
  const langCode = document.getElementById('lang-code');

  const selectResolution = document.getElementById('select-resolution');
  const selectPalette = document.getElementById('select-palette');
  const rangeDensity = document.getElementById('range-density');
  const rangeJitter = document.getElementById('range-jitter');
  const rangeShading = document.getElementById('range-shading');
  const checkStrokes = document.getElementById('check-strokes');

  const densityVal = document.getElementById('density-val');
  const jitterVal = document.getElementById('jitter-val');
  const shadingVal = document.getElementById('shading-val');
  const kbdSpace = document.getElementById('kbd-space');

  // --- Sistema de Idiomas (i18n) - Padrão: Inglês (EUA) ---
  const I18N = {
    en: {
      flag: '🇺🇸',
      code: 'EN',
      btnLangTitle: 'Mudar para Português (Brasil) / Switch to Portuguese',
      appTitle: 'Delaunay Wallpaper',
      btnRandom: 'Generate Random',
      kbdSpace: 'Space',
      btnCopy: 'Copy Image',
      btnDownload: 'Download PNG',
      customizeSummary: 'Customize Settings',
      labelResolution: 'Resolution',
      resScreen: 'Current Screen (Auto)',
      resMobile: 'Mobile / Story (1080x1920)',
      resSquare: 'Square (1440x1440)',
      labelPalette: 'Color Style',
      optPaletteRandom: '🎲 Always Random',
      labelDensity: 'Triangle Size',
      labelJitter: 'Geometric Chaos',
      labelShading: '3D Effect / Relief',
      labelStrokes: 'Highlight Triangle Borders',
      btnShowControls: 'Controls',
      btnTogglePanelTitle: 'Hide Panel [H]',
      btnShowPanelTitle: 'Show Controls [H]',
      densityFine: 'Dense (Fine)',
      densityMed: 'Medium',
      densityChunky: 'Chunky (Few)',
      jitterOrganic: 'Organic',
      jitterBalanced: 'Balanced',
      jitterRegular: 'Geometric',
      hintText: '💡 <strong>Right-click</strong> the image to copy or press <kbd>Space</kbd>',
      toastCopied: '✓ Image copied to clipboard!',
      toastDownload: '✓ Wallpaper download started!',
      toastRightClickHint: 'Right-click the image and select "Copy image"',
      toastCopyError: 'Error preparing image for copy.',
      harmonicPrefix: 'Harmonic'
    },
    pt: {
      flag: '🇧🇷',
      code: 'PT',
      btnLangTitle: 'Switch to English (US) / Mudar para Inglês',
      appTitle: 'Delaunay Wallpaper',
      btnRandom: 'Gerar Aleatório',
      kbdSpace: 'Espaço',
      btnCopy: 'Copiar Imagem',
      btnDownload: 'Baixar PNG',
      customizeSummary: 'Personalizar Detalhes',
      labelResolution: 'Resolução',
      resScreen: 'Tela Atual (Auto)',
      resMobile: 'Celular / Story (1080x1920)',
      resSquare: 'Quadrado (1440x1440)',
      labelPalette: 'Estilo de Cores',
      optPaletteRandom: '🎲 Sempre Aleatório',
      labelDensity: 'Tamanho dos Triângulos',
      labelJitter: 'Desordem Geométrica',
      labelShading: 'Efeito 3D / Relevo',
      labelStrokes: 'Destacar Bordas dos Triângulos',
      btnShowControls: 'Controles',
      btnTogglePanelTitle: 'Ocultar Painel [H]',
      btnShowPanelTitle: 'Mostrar Controles [H]',
      densityFine: 'Muitos (Fino)',
      densityMed: 'Médio',
      densityChunky: 'Poucos (Chunky)',
      jitterOrganic: 'Orgânico',
      jitterBalanced: 'Equilibrado',
      jitterRegular: 'Geométrico',
      hintText: '💡 Clique com o <strong>botão direito</strong> na imagem para copiar ou aperte <kbd>Espaço</kbd>',
      toastCopied: '✓ Imagem copiada para a área de transferência!',
      toastDownload: '✓ Download do wallpaper iniciado!',
      toastRightClickHint: 'Clique com o botão direito na imagem e escolha "Copiar imagem"',
      toastCopyError: 'Erro ao preparar imagem para cópia.',
      harmonicPrefix: 'Harmonia'
    }
  };

  // Idioma padrão: en (English US)
  let currentLang = 'en';

  // --- Paletas Pré-definidas de Alta Fidelidade Visual ---
  const PALETTES = {
    sunset: {
      name: { en: 'Sunset Boulevard', pt: 'Sunset Boulevard' },
      colors: ['#0f051d', '#3b1259', '#7c1c69', '#ca385b', '#f9754b', '#fec163']
    },
    cyberpunk: {
      name: { en: 'Cyberpunk Neon', pt: 'Cyberpunk Neon' },
      colors: ['#05081c', '#151c4a', '#441d74', '#991583', '#00f0ff', '#f000ff']
    },
    nordic: {
      name: { en: 'Nordic Glacier', pt: 'Geleira Nórdica' },
      colors: ['#0b1626', '#142c4c', '#1d4872', '#2f749e', '#59a9c8', '#a8e1e8']
    },
    emerald: {
      name: { en: 'Rainforest Emerald', pt: 'Esmeralda Tropical' },
      colors: ['#041a14', '#093627', '#125c40', '#1f8b5f', '#36c284', '#85e8a7']
    },
    peach: {
      name: { en: 'Peach & Cream', pt: 'Pêssego & Creme' },
      colors: ['#2b1820', '#5a2e3f', '#964860', '#d86e7a', '#f5a499', '#fbe0d4']
    },
    volcanic: {
      name: { en: 'Volcanic Magma', pt: 'Magma Vulcânico' },
      colors: ['#120808', '#2b0c0c', '#5e1414', '#a82218', '#eb5214', '#fbb13c']
    },
    deepcosmos: {
      name: { en: 'Deep Cosmos', pt: 'Cosmos Profundo' },
      colors: ['#070716', '#11103a', '#241a60', '#482484', '#7c3a9e', '#c084fc']
    },
    cherry: {
      name: { en: 'Tokyo Blossom', pt: 'Cerejeira de Tóquio' },
      colors: ['#1a0c18', '#381630', '#632152', '#9c3479', '#dc619f', '#fed2e8']
    },
    obsidian: {
      name: { en: 'Dark Obsidian', pt: 'Obsidiana Escura' },
      colors: ['#090a0f', '#12151e', '#1e2330', '#2d3547', '#475369', '#7888a2']
    },
    amethyst: {
      name: { en: 'Royal Amethyst', pt: 'Ametista Real' },
      colors: ['#130a24', '#281347', '#4b1d7d', '#782eb8', '#a855f7', '#d8b4fe']
    },
    ocean: {
      name: { en: 'Deep Ocean Trench', pt: 'Abismo Oceânico' },
      colors: ['#02101e', '#05233d', '#083c66', '#0f6399', '#1ca2d4', '#4deeea']
    },
    prism: {
      name: { en: 'Prism Rainbow', pt: 'Arco-Íris Prisma' },
      colors: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']
    },
    mojave: {
      name: { en: 'Mojave Sand', pt: 'Areia do Mojave' },
      colors: ['#1c140d', '#3d2516', '#724224', '#b36b3c', '#dca26c', '#f5dac1']
    },
    aurora: {
      name: { en: 'Aurora Borealis', pt: 'Aurora Boreal' },
      colors: ['#061320', '#0a2f3a', '#105f56', '#179f72', '#22e796', '#6eedc8']
    }
  };

  // --- Estado Atual ---
  let currentState = {
    width: window.innerWidth,
    height: window.innerHeight,
    paletteKey: 'random',
    activePalette: null,
    density: 95,
    jitter: 0.75,
    shadingIntensity: 0.55,
    drawStrokes: false,
    gradientAngle: 45,
    lightAngle: 60,
    lightHeight: 0.8,
    zNoiseFreq: 0.003
  };

  // --- Aplicação de Idioma ---
  function applyLanguage(lang) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    const t = I18N[lang];

    // Atualiza botão do idioma
    langFlag.textContent = t.flag;
    langCode.textContent = t.code;
    btnLang.title = t.btnLangTitle;

    // Atualiza elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Tecla de atalho
    if (kbdSpace) kbdSpace.textContent = t.kbdSpace;

    // Tooltips
    btnRandom.title = `${t.btnRandom} [${t.kbdSpace}]`;
    btnCopy.title = `${t.btnCopy} [C]`;
    btnDownload.title = `${t.btnDownload} [S]`;
    btnTogglePanel.title = t.btnTogglePanelTitle;
    btnShowPanel.title = t.btnShowPanelTitle;

    // Dica inicial
    if (hintText) {
      hintText.innerHTML = t.hintText;
    }

    // Atualiza labels dos sliders
    updateDensityLabel(currentState.density);
    updateJitterLabel(Math.round(currentState.jitter * 100));

    // Atualiza nome da paleta ativa no badge
    if (currentState.activePalette) {
      const name = currentState.activePalette.name;
      paletteBadge.textContent = typeof name === 'object' ? (name[lang] || name.en) : name;
    }

    // Salva preferência no navegador
    try {
      localStorage.setItem('delaunay_wallpaper_lang', lang);
    } catch (_) {}
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'pt' : 'en';
    applyLanguage(nextLang);
    showToast(nextLang === 'pt' ? '🇧🇷 Idioma alterado para Português' : '🇺🇸 Language switched to English');
  }

  // --- Funções Utilitárias de Cores ---
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
  }

  function interpolateColor(c1, c2, factor) {
    return [
      c1[0] + (c2[0] - c1[0]) * factor,
      c1[1] + (c2[1] - c1[1]) * factor,
      c1[2] + (c2[2] - c1[2]) * factor
    ];
  }

  function sampleMultiGradient(colorsRgb, t) {
    t = Math.max(0, Math.min(1, t));
    const stopsCount = colorsRgb.length;
    if (stopsCount === 1) return colorsRgb[0];

    const scaled = t * (stopsCount - 1);
    const index = Math.floor(scaled);
    const nextIndex = Math.min(stopsCount - 1, index + 1);
    const factor = scaled - index;

    return interpolateColor(colorsRgb[index], colorsRgb[nextIndex], factor);
  }

  // Gerador de Paletas Harmônicas Algorítmicas
  function generateHarmonicPalette() {
    const baseHue = Math.floor(Math.random() * 360);
    const schemeType = Math.floor(Math.random() * 4);
    const colors = [];

    let hues = [];
    if (schemeType === 0) {
      hues = [baseHue - 40, baseHue - 20, baseHue, baseHue + 20, baseHue + 40];
    } else if (schemeType === 1) {
      const comp = (baseHue + 180) % 360;
      hues = [baseHue - 20, baseHue, (baseHue + 20) % 360, comp - 20, comp + 20];
    } else if (schemeType === 2) {
      hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 60) % 360];
    } else {
      const comp = (baseHue + 180) % 360;
      hues = [baseHue, (baseHue + 30) % 360, (comp - 30) % 360, comp, (comp + 30) % 360];
    }

    const steps = 6;
    for (let i = 0; i < steps; i++) {
      const h = (hues[i % hues.length] + 360) % 360;
      const s = 65 + Math.random() * 30;
      const l = 10 + (i / (steps - 1)) * 75;
      colors.push(hslToHex(h, s, l));
    }

    const t = I18N[currentLang];
    return {
      name: `${t.harmonicPrefix} #${baseHue}°`,
      colors: colors
    };
  }

  function hslToHex(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return rgbToHex(r * 255, g * 255, b * 255);
  }

  // --- Resolução ---
  function updateDimensions() {
    const val = selectResolution.value;
    if (val === 'screen') {
      currentState.width = Math.max(window.innerWidth, 320);
      currentState.height = Math.max(window.innerHeight, 320);
    } else {
      const [w, h] = val.split('x').map(Number);
      currentState.width = w;
      currentState.height = h;
    }
    canvas.width = currentState.width;
    canvas.height = currentState.height;
  }

  // --- Geração da Malha Delaunay ---
  function generateArtwork() {
    updateDimensions();

    const w = currentState.width;
    const h = currentState.height;
    const cellSize = currentState.density;
    const jitterFactor = currentState.jitter;

    // Determina a paleta ativa
    let activePalette;
    if (currentState.paletteKey === 'random') {
      const paletteKeys = Object.keys(PALETTES);
      const usePreset = Math.random() > 0.35;
      if (usePreset) {
        const randomKey = paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
        activePalette = PALETTES[randomKey];
      } else {
        activePalette = generateHarmonicPalette();
      }
    } else {
      activePalette = PALETTES[currentState.paletteKey] || PALETTES.sunset;
    }
    currentState.activePalette = activePalette;

    // Atualiza nome exibido no badge conforme idioma
    const name = activePalette.name;
    paletteBadge.textContent = typeof name === 'object' ? (name[currentLang] || name.en) : name;

    const colorsRgb = activePalette.colors.map(hexToRgb);

    // Margem externa para não deixar bordas vazias
    const bleed = cellSize * 2;
    const cols = Math.ceil((w + bleed * 2) / cellSize);
    const rows = Math.ceil((h + bleed * 2) / cellSize);

    // Vetores de pontos e relevos
    const points = [];
    const heights = [];

    const f1 = currentState.zNoiseFreq;
    const f2 = f1 * 2.3;
    const phaseX = Math.random() * Math.PI * 2;
    const phaseY = Math.random() * Math.PI * 2;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const baseX = -bleed + c * cellSize;
        const baseY = -bleed + r * cellSize;

        const jx = (Math.random() - 0.5) * cellSize * jitterFactor;
        const jy = (Math.random() - 0.5) * cellSize * jitterFactor;
        const px = baseX + jx;
        const py = baseY + jy;

        const elevation =
          Math.sin(px * f1 + phaseX) * Math.cos(py * f1 + phaseY) * 200 +
          Math.sin(px * f2) * 80 +
          (Math.random() - 0.5) * 60;

        points.push([px, py]);
        heights.push(elevation);
      }
    }

    // Executa triangulação de Delaunay
    const delaunay = Delaunator.from(points);
    const triangles = delaunay.triangles;

    // Vetor de Luz 3D
    const lightRad = (currentState.lightAngle * Math.PI) / 180;
    const lx = Math.cos(lightRad) * 0.7;
    const ly = Math.sin(lightRad) * 0.7;
    const lz = currentState.lightHeight;
    const lightLen = Math.hypot(lx, ly, lz);
    const L = [lx / lightLen, ly / lightLen, lz / lightLen];

    // Ângulo do Gradiente de Cores
    const gradRad = (currentState.gradientAngle * Math.PI) / 180;
    const cosGrad = Math.cos(gradRad);
    const sinGrad = Math.sin(gradRad);

    const p1 = 0 * cosGrad + 0 * sinGrad;
    const p2 = w * cosGrad + 0 * sinGrad;
    const p3 = 0 * cosGrad + h * sinGrad;
    const p4 = w * cosGrad + h * sinGrad;
    const minProj = Math.min(p1, p2, p3, p4);
    const maxProj = Math.max(p1, p2, p3, p4);
    const projRange = Math.max(1, maxProj - minProj);

    ctx.clearRect(0, 0, w, h);

    // Renderiza cada triângulo da malha Delaunay
    for (let i = 0; i < triangles.length; i += 3) {
      const i0 = triangles[i];
      const i1 = triangles[i + 1];
      const i2 = triangles[i + 2];

      const p0 = points[i0];
      const p1Pt = points[i1];
      const p2Pt = points[i2];

      const z0 = heights[i0];
      const z1 = heights[i1];
      const z2 = heights[i2];

      const cx = (p0[0] + p1Pt[0] + p2Pt[0]) / 3;
      const cy = (p0[1] + p1Pt[1] + p2Pt[1]) / 3;

      if (
        Math.max(p0[0], p1Pt[0], p2Pt[0]) < -50 ||
        Math.min(p0[0], p1Pt[0], p2Pt[0]) > w + 50 ||
        Math.max(p0[1], p1Pt[1], p2Pt[1]) < -50 ||
        Math.min(p0[1], p1Pt[1], p2Pt[1]) > h + 50
      ) {
        continue;
      }

      // Vetor Normal 3D
      const v1x = p1Pt[0] - p0[0];
      const v1y = p1Pt[1] - p0[1];
      const v1z = (z1 - z0) * currentState.shadingIntensity;

      const v2x = p2Pt[0] - p0[0];
      const v2y = p2Pt[1] - p0[1];
      const v2z = (z2 - z0) * currentState.shadingIntensity;

      let nx = v1y * v2z - v1z * v2y;
      let ny = v1z * v2x - v1x * v2z;
      let nz = v1x * v2y - v1y * v2x;

      if (nz < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }

      const nLen = Math.hypot(nx, ny, nz) || 1;
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      // Iluminação difusa
      const diffuse = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      const ambient = 0.45;
      const lightFactor = ambient + (1 - ambient) * diffuse;

      // Interpolação de cor
      const proj = cx * cosGrad + cy * sinGrad;
      const t = (proj - minProj) / projRange;
      const baseRgb = sampleMultiGradient(colorsRgb, t);

      const r = Math.min(255, baseRgb[0] * lightFactor);
      const g = Math.min(255, baseRgb[1] * lightFactor);
      const b = Math.min(255, baseRgb[2] * lightFactor);

      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1Pt[0], p1Pt[1]);
      ctx.lineTo(p2Pt[0], p2Pt[1]);
      ctx.closePath();

      ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      ctx.fill();

      if (currentState.drawStrokes) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    // Exporta para a tag <img> para clique nativo do botão direito -> Copiar imagem
    try {
      const dataUrl = canvas.toDataURL('image/png');
      wallpaperImg.src = dataUrl;
    } catch (err) {
      console.warn('Erro ao atualizar imagem:', err);
    }
  }

  // --- Função de Randomização Total ---
  function randomizeAll() {
    const randomDensity = 60 + Math.floor(Math.random() * 80);
    currentState.density = randomDensity;
    rangeDensity.value = randomDensity;
    updateDensityLabel(randomDensity);

    const randomJitter = 0.5 + Math.random() * 0.45;
    currentState.jitter = randomJitter;
    rangeJitter.value = Math.round(randomJitter * 100);
    updateJitterLabel(Math.round(randomJitter * 100));

    const randomShading = 0.3 + Math.random() * 0.5;
    currentState.shadingIntensity = randomShading;
    rangeShading.value = Math.round(randomShading * 100);
    shadingVal.textContent = `${Math.round(randomShading * 100)}%`;

    currentState.gradientAngle = Math.floor(Math.random() * 360);
    currentState.lightAngle = Math.floor(Math.random() * 360);
    currentState.lightHeight = 0.6 + Math.random() * 0.5;
    currentState.zNoiseFreq = 0.002 + Math.random() * 0.003;

    if (selectPalette.value === 'random') {
      currentState.paletteKey = 'random';
    }

    const diceIcon = btnRandom.querySelector('.dice-icon');
    if (diceIcon) {
      diceIcon.style.transform = `rotate(${Math.floor(Math.random() * 360 + 180)}deg) scale(1.15)`;
      setTimeout(() => {
        diceIcon.style.transform = '';
      }, 400);
    }

    generateArtwork();
  }

  // --- Feedback Toast ---
  let toastTimeout;
  function showToast(message) {
    toastText.textContent = message;
    feedbackToast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      feedbackToast.classList.remove('show');
    }, 2800);
  }

  // --- Copiar Imagem para Área de Transferência ---
  async function copyImageToClipboard() {
    const t = I18N[currentLang];
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast(t.toastCopyError);
          return;
        }

        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            showToast(t.toastCopied);
            return;
          } catch (e) {
            console.warn('ClipboardItem API fallback', e);
          }
        }
        showToast(t.toastRightClickHint);
      }, 'image/png');
    } catch (err) {
      showToast(t.toastRightClickHint);
    }
  }

  // --- Baixar Imagem PNG ---
  function downloadImage() {
    const t = I18N[currentLang];
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    link.download = `delaunay-wallpaper-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(t.toastDownload);
  }

  // --- Rótulos Informativos dos Sliders ---
  function updateDensityLabel(val) {
    const t = I18N[currentLang];
    if (val < 65) densityVal.textContent = t.densityFine;
    else if (val < 110) densityVal.textContent = t.densityMed;
    else densityVal.textContent = t.densityChunky;
  }

  function updateJitterLabel(val) {
    const t = I18N[currentLang];
    if (val > 70) jitterVal.textContent = t.jitterOrganic;
    else if (val < 40) jitterVal.textContent = t.jitterRegular;
    else jitterVal.textContent = t.jitterBalanced;
  }

  // --- Event Listeners ---

  // Botão de Idioma
  btnLang.addEventListener('click', toggleLanguage);

  // Botão Random
  btnRandom.addEventListener('click', randomizeAll);

  // Botões de Cópia e Download
  btnCopy.addEventListener('click', copyImageToClipboard);
  btnDownload.addEventListener('click', downloadImage);

  // Ocultar / Exibir painel flutuante
  btnTogglePanel.addEventListener('click', () => {
    uiPanel.classList.add('hidden');
    btnShowPanel.classList.remove('hidden');
  });

  btnShowPanel.addEventListener('click', () => {
    uiPanel.classList.remove('hidden');
    btnShowPanel.classList.add('hidden');
  });

  // Mudança de Resolução
  selectResolution.addEventListener('change', () => {
    generateArtwork();
  });

  // Mudança de Paleta Manual
  selectPalette.addEventListener('change', (e) => {
    currentState.paletteKey = e.target.value;
    generateArtwork();
  });

  // Densidade
  rangeDensity.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    currentState.density = val;
    updateDensityLabel(val);
    generateArtwork();
  });

  // Jitter
  rangeJitter.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    currentState.jitter = val / 100;
    updateJitterLabel(val);
    generateArtwork();
  });

  // Shading 3D
  rangeShading.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    currentState.shadingIntensity = val / 100;
    shadingVal.textContent = `${val}%`;
    generateArtwork();
  });

  // Bordas
  checkStrokes.addEventListener('change', (e) => {
    currentState.drawStrokes = e.target.checked;
    generateArtwork();
  });

  // Atalhos de Teclado
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      randomizeAll();
    } else if (e.key === 'c' || e.key === 'C') {
      copyImageToClipboard();
    } else if (e.key === 's' || e.key === 'S') {
      downloadImage();
    } else if (e.key === 'h' || e.key === 'H') {
      if (uiPanel.classList.contains('hidden')) {
        uiPanel.classList.remove('hidden');
        btnShowPanel.classList.add('hidden');
      } else {
        uiPanel.classList.add('hidden');
        btnShowPanel.classList.remove('hidden');
      }
    }
  });

  // Redimensionamento da Janela
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (selectResolution.value === 'screen') {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        generateArtwork();
      }, 200);
    }
  });

  // Fadeout suave da dica inicial
  setTimeout(() => {
    const hint = document.getElementById('hint-toast');
    if (hint) {
      hint.style.opacity = '0';
      setTimeout(() => hint.remove(), 600);
    }
  }, 7000);

  // Inicialização com idioma padrão (Inglês dos EUA) ou salvo anteriormente
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('delaunay_wallpaper_lang') || 'en';
  } catch (_) {}
  applyLanguage(savedLang);

  // Inicialização inicial da arte
  randomizeAll();
})();
