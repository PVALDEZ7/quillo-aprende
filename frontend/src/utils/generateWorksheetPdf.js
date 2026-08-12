import { jsPDF } from 'jspdf';

const MM = { w: 210, h: 297, left: 14, right: 14, top: 12, bottom: 16 };
const COLORS = {
  blue: [9, 83, 164],
  navy: [17, 55, 104],
  green: [38, 153, 72],
  purple: [111, 66, 193],
  orange: [235, 151, 18],
  ink: [31, 49, 70],
  muted: [90, 107, 127],
  line: [218, 228, 238],
  paleBlue: [241, 247, 252],
  paleGreen: [242, 250, 244],
  palePurple: [248, 245, 253],
  white: [255, 255, 255]
};

const isCommunication = material => String(material?.area_nombre || '').toLowerCase().includes('comunic');
const accentFor = material => isCommunication(material) ? COLORS.purple : COLORS.green;

function pdfSafe(value = '') {
  return String(value)
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/×/g, 'x')
    .replace(/÷/g, '/')
    .replace(/▲/g, '[triangulo]')
    .replace(/●/g, '[circulo]')
    .replace(/■/g, '[cuadrado]')
    .replace(/◆/g, '[rombo]')
    .replace(/→/g, '->')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

function slug(value = 'ficha') {
  return String(value)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'ficha';
}

function drawLogo(doc, x, y) {
  doc.setDrawColor(...COLORS.white);
  doc.setLineWidth(0.8);
  doc.circle(x, y, 7.3, 'S');
  doc.setFillColor(89, 185, 87);
  doc.triangle(x - 5.2, y + 1.5, x - 1.4, y - 3.0, x + 0.6, y + 1.5, 'F');
  doc.setFillColor(46, 147, 73);
  doc.triangle(x - 1.0, y + 1.5, x + 2.3, y - 4.2, x + 5.2, y + 1.5, 'F');
  doc.setDrawColor(...COLORS.white);
  doc.setLineWidth(0.6);
  doc.line(x - 4.4, y + 3.0, x, y + 4.5);
  doc.line(x, y + 4.5, x + 4.4, y + 3.0);
  doc.line(x, y + 4.5, x, y + 1.8);
}

function drawWatermark(doc) {
  doc.setFillColor(246, 250, 252);
  doc.rect(0, 0, MM.w, MM.h, 'F');

  doc.setFillColor(236, 245, 248);
  doc.triangle(0, 104, 18, 78, 36, 104, 'F');
  doc.triangle(18, 104, 42, 69, 67, 104, 'F');
  doc.setFillColor(239, 248, 241);
  doc.triangle(146, 122, 169, 91, 191, 122, 'F');
  doc.triangle(171, 122, 194, 81, 210, 112, 'F');

  doc.setDrawColor(230, 240, 248);
  doc.setLineWidth(0.6);
  doc.circle(18, 145, 4, 'S');
  doc.line(14, 145, 22, 145);
  doc.line(18, 141, 18, 149);
  doc.roundedRect(184, 149, 10, 7, 1.2, 1.2, 'S');
  doc.line(186, 151, 192, 155);
  doc.line(192, 151, 186, 155);

  doc.setFillColor(239, 247, 253);
  doc.ellipse(29, 268, 50, 15, 'F');
  doc.setFillColor(239, 249, 242);
  doc.ellipse(182, 270, 52, 18, 'F');
}

function drawHeader(doc, material, pageNo, isFirst) {
  drawWatermark(doc);
  doc.setFillColor(...COLORS.blue);
  doc.rect(0, 0, MM.w, 30, 'F');
  doc.setFillColor(...COLORS.green);
  doc.ellipse(184, 1, 52, 23, 'F');
  doc.setFillColor(...COLORS.blue);
  doc.ellipse(152, -8, 48, 23, 'F');

  drawLogo(doc, 15, 15);
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('QUILLO APRENDE', 27, 13.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.text('Plataforma Web de Apoyo Educativo', 27, 20);

  doc.setFontSize(7.3);
  doc.setFont('helvetica', 'bold');
  doc.text(`Ficha PDF  |  Pag. ${pageNo}`, 173, 24.2, { align: 'center' });

  if (!isFirst) {
    doc.setTextColor(...COLORS.navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.text(pdfSafe(material.titulo).toUpperCase(), MM.left, 38);
  }
}

function drawFooter(doc) {
  doc.setFillColor(...COLORS.blue);
  doc.ellipse(18, 302, 56, 20, 'F');
  doc.setFillColor(...COLORS.green);
  doc.ellipse(190, 304, 58, 21, 'F');
  doc.setTextColor(...COLORS.blue);
  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(8.2);
  doc.text('Educacion para todos, desarrollo para Quillo.', MM.w / 2, 288, { align: 'center' });
}

function chip(doc, x, y, label, value, color) {
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLORS.line);
  doc.roundedRect(x, y, 57, 13, 2.5, 2.5, 'FD');
  doc.setFillColor(...color);
  doc.circle(x + 7, y + 6.5, 3.8, 'F');
  doc.setTextColor(...color);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.9);
  doc.text(label, x + 13, y + 5.2);
  doc.setTextColor(...COLORS.ink);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  const line = doc.splitTextToSize(pdfSafe(value), 41).slice(0, 2);
  doc.text(line, x + 13, y + 9.0);
}

function firstPageIntro(doc, material) {
  const accent = accentFor(material);
  chip(doc, 14, 34, 'Area', material.area_nombre || '-', COLORS.blue);
  chip(doc, 76.5, 34, 'Subarea', material.subarea_nombre || '-', accent);
  chip(doc, 139, 34, 'Nivel', material.nivel_nombre || '-', COLORS.blue);

  doc.setTextColor(...COLORS.navy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  const title = doc.splitTextToSize(pdfSafe(material.titulo).toUpperCase(), 170).slice(0, 2);
  doc.text(title, MM.w / 2, 58, { align: 'center' });
  const titleHeight = title.length * 6.6;

  const y = 60 + titleHeight;
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.line);
  doc.roundedRect(22, y, 166, 11, 2.3, 2.3, 'FD');
  doc.setTextColor(...COLORS.navy);
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre:', 29, y + 7);
  doc.line(47, y + 7.3, 112, y + 7.3);
  doc.text('Fecha:', 124, y + 7);
  doc.line(140, y + 7.3, 178, y + 7.3);
  return y + 17;
}

function sectionHeading(doc, number, title, y, color) {
  doc.setFillColor(...color);
  doc.roundedRect(MM.left + 5, y + 3.5, 8, 8, 1.5, 1.5, 'F');
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(String(number), MM.left + 9, y + 9.2, { align: 'center' });
  doc.setTextColor(...color);
  doc.setFontSize(11.5);
  doc.text(title, MM.left + 17, y + 9.2);
}

function addPage(doc, material, state) {
  doc.addPage();
  state.page += 1;
  drawHeader(doc, material, state.page, false);
  drawFooter(doc);
  state.y = 45;
}

function ensure(doc, material, state, needed) {
  if (state.y + needed > 278) addPage(doc, material, state);
}

function addParagraphCard(doc, material, state, number, title, text, color, fill) {
  const safe = pdfSafe(text || 'Contenido no disponible.');
  const lines = doc.splitTextToSize(safe, 163);
  const maxLines = 25;
  let offset = 0;
  let part = 0;
  while (offset < lines.length) {
    const chunk = lines.slice(offset, offset + maxLines);
    const titleLabel = part === 0 ? title : `${title} (continuacion)`;
    // Give the paragraph enough vertical breathing room so no decorative line
    // can cross the last line of text. The inner panel uses a soft fill only
    // (no colored stroke) for a cleaner printed PDF.
    const h = 28 + chunk.length * 5.3;
    ensure(doc, material, state, h + 5);
    doc.setFillColor(...COLORS.white);
    doc.setDrawColor(...COLORS.line);
    doc.roundedRect(MM.left, state.y, 182, h, 3, 3, 'FD');
    sectionHeading(doc, number, titleLabel, state.y + 3, color);
    doc.setFillColor(...fill);
    doc.roundedRect(MM.left + 20, state.y + 16, 156, h - 20, 2.3, 2.3, 'F');
    doc.setTextColor(...COLORS.ink);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.1);
    doc.text(chunk, MM.left + 25, state.y + 24, { lineHeightFactor: 1.45 });
    state.y += h + 6;
    offset += chunk.length;
    part += 1;
  }
}

function extractExercises(material) {
  const raw = pdfSafe(material?.ficha || '');
  if (!raw) return [];
  let cleaned = raw.replace(/^FICHA DE TRABAJO\s*/i, '');
  const title = pdfSafe(material?.titulo || '').toUpperCase();
  if (title && cleaned.toUpperCase().startsWith(title)) cleaned = cleaned.slice(title.length).trim();
  const parts = cleaned.split(/\s+(?=\d+\.\s*)/).map(s => s.trim()).filter(Boolean);
  if (parts.length > 1) return parts;
  const inline = cleaned.match(/\d+\.\s*.*?(?=(?:\s+\d+\.)|$)/g);
  if (inline?.length) return inline.map(s => s.trim());
  return [cleaned];
}

function addPractice(doc, material, state) {
  const accent = accentFor(material);
  const items = extractExercises(material);
  ensure(doc, material, state, 36);
  const headerY = state.y;
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.line);
  doc.roundedRect(MM.left, headerY, 182, 19, 3, 3, 'FD');
  sectionHeading(doc, 3, 'Practicamos', headerY + 3, COLORS.blue);
  state.y += 23;

  const list = items.length ? items : ['Revisa la explicacion y desarrolla un ejemplo propio.'];
  list.forEach((item, index) => {
    const lines = doc.splitTextToSize(pdfSafe(item), 155);
    const h = Math.max(14, 7 + lines.length * 4.6);
    ensure(doc, material, state, h + 3);
    doc.setFillColor(...COLORS.white);
    doc.setDrawColor(...COLORS.line);
    doc.roundedRect(MM.left + 7, state.y, 168, h, 2.2, 2.2, 'FD');
    doc.setFillColor(...accent);
    doc.circle(MM.left + 15, state.y + 7, 3.6, 'F');
    doc.setTextColor(...COLORS.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(String(index + 1), MM.left + 15, state.y + 9.2, { align: 'center' });
    doc.setTextColor(...COLORS.ink);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(lines, MM.left + 23, state.y + 8, { lineHeightFactor: 1.35 });
    state.y += h + 3;
  });
  state.y += 3;
}

function addChallenge(doc, material, state, questions = []) {
  const list = Array.isArray(questions) ? questions.slice(0, 3) : [];
  ensure(doc, material, state, 28);
  const y = state.y;
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.line);
  doc.roundedRect(MM.left, y, 182, 19, 3, 3, 'FD');
  sectionHeading(doc, 4, 'Reto', y + 3, COLORS.orange);
  state.y += 23;

  if (!list.length) {
    ensure(doc, material, state, 23);
    doc.setFillColor(255, 250, 237);
    doc.setDrawColor(...COLORS.orange);
    doc.roundedRect(MM.left + 7, state.y, 168, 20, 2.3, 2.3, 'FD');
    doc.setTextColor(...COLORS.ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.3);
    doc.text('Reto pendiente de publicacion', MM.left + 14, state.y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('El docente aun no ha registrado preguntas para este material.', MM.left + 14, state.y + 14);
    state.y += 26;
    return;
  }

  list.forEach((q, index) => {
    const questionLines = doc.splitTextToSize(`${index + 1}. ${pdfSafe(q.pregunta)}`, 158);
    const optionTexts = (q.opciones || []).slice(0, 4).map((op, i) => `${String.fromCharCode(65 + i)}) ${pdfSafe(op)}`);
    const optionLines = optionTexts.map(t => doc.splitTextToSize(t, 72));
    const optionRows = Math.max(1, Math.ceil(optionLines.length / 2));
    const h = 16 + questionLines.length * 4.6 + optionRows * 9;
    ensure(doc, material, state, h + 4);
    doc.setFillColor(255, 251, 241);
    doc.setDrawColor(...COLORS.orange);
    doc.roundedRect(MM.left + 7, state.y, 168, h, 2.4, 2.4, 'FD');
    doc.setTextColor(...COLORS.ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.text(questionLines, MM.left + 13, state.y + 8, { lineHeightFactor: 1.3 });
    let oy = state.y + 11 + questionLines.length * 4.6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    optionTexts.forEach((op, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ox = MM.left + 14 + col * 79;
      const yy = oy + row * 9;
      doc.setDrawColor(...COLORS.orange);
      doc.circle(ox, yy - 1.5, 2.3, 'S');
      doc.setTextColor(...COLORS.ink);
      doc.text(doc.splitTextToSize(op, 68), ox + 5, yy);
    });
    state.y += h + 4;
  });
}

export function generateWorksheetPdf(material, questions = []) {
  if (!material) return;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const state = { page: 1, y: 0 };
  drawHeader(doc, material, state.page, true);
  drawFooter(doc);
  state.y = firstPageIntro(doc, material);

  addParagraphCard(doc, material, state, 1, 'Objetivo', material.descripcion, COLORS.blue, COLORS.paleBlue);
  addParagraphCard(doc, material, state, 2, 'Aprendemos', material.contenido, accentFor(material), isCommunication(material) ? COLORS.palePurple : COLORS.paleGreen);
  addPractice(doc, material, state);
  addChallenge(doc, material, state, questions);

  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p += 1) {
    doc.setPage(p);
    doc.setTextColor(...COLORS.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.6);
    doc.text(`Material: ${pdfSafe(material.titulo)}  |  Pagina ${p} de ${total}`, MM.w / 2, 293.2, { align: 'center' });
  }

  doc.save(`quillo-aprende-${slug(material.titulo)}.pdf`);
}
