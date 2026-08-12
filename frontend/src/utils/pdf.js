// Generador PDF ligero sin dependencias externas.
// Usa fuentes PDF estándar (Helvetica/Helvetica-Bold) y descarga una ficha A4.

const CP1252 = {
  '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84, '…': 0x85, '†': 0x86,
  '‡': 0x87, 'ˆ': 0x88, '‰': 0x89, 'Š': 0x8A, '‹': 0x8B, 'Œ': 0x8C,
  'Ž': 0x8E, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95,
  '–': 0x96, '—': 0x97, '˜': 0x98, '™': 0x99, 'š': 0x9A, '›': 0x9B,
  'œ': 0x9C, 'ž': 0x9E, 'Ÿ': 0x9F
};

const cleanText = (value = '') => String(value)
  .replace(/▲/g, '[triángulo]')
  .replace(/●/g, '[círculo]')
  .replace(/■/g, '[cuadrado]')
  .replace(/◆/g, '[rombo]')
  .replace(/\t/g, '    ');

function encode1252(value) {
  const s = cleanText(value);
  const bytes = [];
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (code <= 0x7F || (code >= 0xA0 && code <= 0xFF)) bytes.push(code);
    else if (CP1252[ch] !== undefined) bytes.push(CP1252[ch]);
    else bytes.push(0x3F); // ? para caracteres no incluidos en WinAnsi
  }
  return new Uint8Array(bytes);
}

function concatBytes(parts) {
  const total = parts.reduce((sum, p) => sum + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

function escapePdfString(value) {
  return cleanText(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\r/g, '');
}

function wrapText(text, maxChars = 82) {
  const source = cleanText(text);
  const lines = [];
  for (const paragraph of source.split('\n')) {
    if (!paragraph.trim()) {
      lines.push('');
      continue;
    }
    const words = paragraph.trim().split(/\s+/);
    let current = '';
    for (const word of words) {
      if (!current) {
        current = word;
      } else if ((current + ' ' + word).length <= maxChars) {
        current += ' ' + word;
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

const safeFileName = (value = 'ficha') => cleanText(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9_-]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase() || 'ficha';

function textCmd(text, x, y, size = 11, bold = false) {
  const font = bold ? 'F2' : 'F1';
  return `BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfString(text)}) Tj ET\n`;
}

function lineCmd(x1, y1, x2, y2, width = 0.7) {
  return `${width} w ${x1} ${y1} m ${x2} ${y2} l S\n`;
}

function rectFillCmd(x, y, w, h, gray = 0.94) {
  return `${gray} g ${x} ${y} ${w} ${h} re f 0 g\n`;
}

function buildPageStreams(material) {
  const W = 595;
  const H = 842;
  const M = 52;
  const minY = 62;
  const pageStreams = [];
  let commands = [];
  let y = H - M;
  let pageNo = 1;

  const footer = () => {
    commands.push(lineCmd(M, 45, W - M, 45, 0.45));
    commands.push(textCmd('Quillo Aprende · Educación para todos, desarrollo para Quillo.', M, 28, 8));
    commands.push(textCmd(`Página ${pageNo}`, W - 92, 28, 8));
  };

  const newPage = () => {
    if (commands.length) {
      footer();
      pageStreams.push(commands.join(''));
      pageNo += 1;
    }
    commands = [];
    y = H - M;
    // Encabezado de continuación
    commands.push(textCmd('QUILLO APRENDE', M, y, 13, true));
    y -= 22;
    commands.push(lineCmd(M, y, W - M, y, 0.6));
    y -= 24;
  };

  const ensure = (height) => {
    if (y - height < minY) newPage();
  };

  const addLine = (text, { size = 11, bold = false, gap = 16, x = M } = {}) => {
    ensure(gap + 4);
    commands.push(textCmd(text, x, y, size, bold));
    y -= gap;
  };

  const addWrapped = (text, { size = 11, bold = false, gap = 16, maxChars = 82, indent = 0 } = {}) => {
    const lines = wrapText(text, maxChars);
    for (const line of lines) {
      ensure(gap + 3);
      if (line) commands.push(textCmd(line, M + indent, y, size, bold));
      y -= line ? gap : Math.max(8, gap * 0.65);
    }
  };

  // Primera página
  commands.push(rectFillCmd(0, H - 108, W, 108, 0.94));
  commands.push(textCmd('QUILLO APRENDE', M, H - 54, 20, true));
  commands.push(textCmd('FICHA DE TRABAJO', M, H - 80, 14, true));
  y = H - 132;

  addWrapped(material.titulo || 'Material educativo', { size: 16, bold: true, gap: 21, maxChars: 57 });
  y -= 2;
  addLine(`Nivel: ${material.nivel_nombre || ''}`, { size: 10, gap: 15 });
  addLine(`Área: ${material.area_nombre || ''}`, { size: 10, gap: 15 });
  addLine(`Subárea: ${material.subarea_nombre || ''}`, { size: 10, gap: 15 });
  const date = new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
  addLine(`Fecha de descarga: ${date}`, { size: 10, gap: 18 });
  commands.push(lineCmd(M, y + 4, W - M, y + 4, 0.7));
  y -= 16;

  if (material.descripcion) {
    addLine('Propósito', { size: 12, bold: true, gap: 18 });
    addWrapped(material.descripcion, { size: 10.5, gap: 15, maxChars: 87 });
    y -= 6;
  }

  addLine('Actividades', { size: 12, bold: true, gap: 20 });
  const ficha = (material.ficha || '').trim() || 'El docente aún no ha registrado actividades para esta ficha.';
  addWrapped(ficha, { size: 11, gap: 17, maxChars: 80 });

  y -= 8;
  ensure(58);
  commands.push(lineCmd(M, y, W - M, y, 0.5));
  y -= 24;
  addLine('Nombre del estudiante: ____________________________________________', { size: 10, gap: 22 });
  addLine('Firma / revisión: _________________________________________________', { size: 10, gap: 18 });

  footer();
  pageStreams.push(commands.join(''));
  return pageStreams;
}

function buildPdf(material) {
  const streams = buildPageStreams(material);
  const pageCount = streams.length;
  const fontRegularId = 3 + pageCount * 2;
  const fontBoldId = fontRegularId + 1;

  const objects = new Map();
  objects.set(1, '<< /Type /Catalog /Pages 2 0 R >>');

  const kids = [];
  for (let i = 0; i < pageCount; i += 1) {
    const pageId = 3 + i * 2;
    const contentId = pageId + 1;
    kids.push(`${pageId} 0 R`);
    objects.set(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    const streamBytes = encode1252(streams[i]);
    objects.set(contentId, { streamBytes });
  }
  objects.set(2, `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pageCount} >>`);
  objects.set(fontRegularId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  objects.set(fontBoldId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

  const maxId = fontBoldId;
  const parts = [encode1252('%PDF-1.4\n%âãÏÓ\n')];
  const offsets = new Array(maxId + 1).fill(0);
  let byteOffset = parts[0].length;

  for (let id = 1; id <= maxId; id += 1) {
    offsets[id] = byteOffset;
    const value = objects.get(id);
    let objBytes;
    if (value && value.streamBytes) {
      const head = encode1252(`${id} 0 obj\n<< /Length ${value.streamBytes.length} >>\nstream\n`);
      const tail = encode1252('\nendstream\nendobj\n');
      objBytes = concatBytes([head, value.streamBytes, tail]);
    } else {
      objBytes = encode1252(`${id} 0 obj\n${value}\nendobj\n`);
    }
    parts.push(objBytes);
    byteOffset += objBytes.length;
  }

  const xrefOffset = byteOffset;
  let xref = `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= maxId; id += 1) {
    xref += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  parts.push(encode1252(xref));
  return concatBytes(parts);
}

export function downloadMaterialPdf(material) {
  if (!material) return;
  const pdfBytes = buildPdf(material);
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ficha-${safeFileName(material.titulo)}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

// Export auxiliar para pruebas/uso interno.
export function buildMaterialPdfBytes(material) {
  return buildPdf(material);
}
