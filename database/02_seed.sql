USE quillo_aprende;
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE retos_evaluaciones;
TRUNCATE TABLE materiales;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE subareas;
TRUNCATE TABLE areas;
TRUNCATE TABLE niveles;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO niveles(id_nivel,nombre) VALUES(1,'Iniciación');
INSERT INTO niveles(id_nivel,nombre) VALUES(2,'Básico');
INSERT INTO niveles(id_nivel,nombre) VALUES(3,'Intermedio');
INSERT INTO niveles(id_nivel,nombre) VALUES(4,'Avanzado');
INSERT INTO areas(id_area,nombre) VALUES(1,'Matemática');
INSERT INTO areas(id_area,nombre) VALUES(2,'Comunicación');
INSERT INTO subareas(id_subarea,id_area,nombre) VALUES(1,1,'Razonamiento matemático');
INSERT INTO subareas(id_subarea,id_area,nombre) VALUES(2,1,'Aritmética');
INSERT INTO subareas(id_subarea,id_area,nombre) VALUES(3,2,'Razonamiento verbal');
INSERT INTO subareas(id_subarea,id_area,nombre) VALUES(4,2,'Literatura');

-- Usuarios demo
INSERT INTO usuarios(id_usuario,nombre,email,password_hash,rol) VALUES(1,'Docente Demo','docente@quillo.pe','2613a60d2513fe2de0a0c17dd0308330:16fcc3e21e8bed1c0ee28c9e74f1f6dcbebe3a3a3b0a0497dff8e86e7ce78779712f4ededa5dd8bcdc57a88abd61f7f2fc50a62f5833923882c854d05a5b591b','docente');
INSERT INTO usuarios(id_usuario,nombre,email,password_hash,rol) VALUES(2,'Administrador Demo','admin@quillo.pe','c6572bf2605861d92059234f25e11b47:6354043bed2c815f10a034153b299bab43948c8b538dbc512329945ea6c7fe1930c08d9ffac5a612138861d0c2089708183bb23b34c86bb547c17cd13e63b6c6','admin');

INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(1,'Series y patrones sencillos','Reconoce reglas simples en secuencias.','Un patrón es una regla que se repite. Observa qué cambia y qué permanece. Ejemplo: 2, 4, 6, 8 aumenta de 2 en 2.','FICHA DE TRABAJO
SERIES Y PATRONES SENCILLOS

1. Completa 1,2,3,__,__.
2. Completa 2,4,6,__,__.
3. Explica la regla.',1,1,1,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(2,'Suma y resta con números pequeños','Resuelve adiciones y sustracciones básicas.','Sumar es juntar cantidades y restar es quitar o hallar una diferencia. Primero identifica los datos y luego la operación.','FICHA DE TRABAJO
SUMA Y RESTA CON NÚMEROS PEQUEÑOS

1. 4+3=__.
2. 9-5=__.
3. Pedro tenía 8 canicas y regaló 3. ¿Cuántas quedan?',1,1,2,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(3,'Sinónimos y antónimos','Relaciona palabras por semejanza u oposición.','Los sinónimos tienen significado parecido y los antónimos expresan ideas opuestas. Ejemplo: feliz-contento; alto-bajo.','FICHA DE TRABAJO
SINÓNIMOS Y ANTÓNIMOS

1. Sinónimo de feliz.
2. Antónimo de grande.
3. Crea una oración con un sinónimo.',1,2,3,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(4,'El cuento: inicio, nudo y desenlace','Reconoce las partes principales de un cuento.','En el inicio aparecen personajes y lugar; en el nudo surge un problema; en el desenlace se resuelve o termina la historia.','FICHA DE TRABAJO
EL CUENTO: INICIO, NUDO Y DESENLACE

1. ¿Quién es el personaje principal?
2. ¿Cuál es el problema?
3. ¿Cómo termina?',1,2,4,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(5,'Analogías y relaciones numéricas','Descubre operaciones entre pares de números.','En una analogía numérica se identifica la relación del primer par y se aplica al segundo. Ejemplo: 3 es a 6 como 5 es a 10.','FICHA DE TRABAJO
ANALOGÍAS Y RELACIONES NUMÉRICAS

1. 2:4::5:__.
2. 3:9::4:__.
3. Explica la regla.',2,1,1,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(6,'Multiplicación y división','Comprende producto y reparto en partes iguales.','Multiplicar es sumar repetidamente una cantidad y dividir es repartir en partes iguales. Ejemplo: 4×3=12 y 12÷3=4.','FICHA DE TRABAJO
MULTIPLICACIÓN Y DIVISIÓN

1. 6×4=__.
2. 24÷6=__.
3. Reparte 20 lápices entre 4 niños.',2,1,2,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(7,'Oraciones incompletas y conectores','Usa conectores para mantener la coherencia.','Los conectores unen ideas: porque expresa causa, pero contraste, por eso consecuencia y además suma información.','FICHA DE TRABAJO
ORACIONES INCOMPLETAS Y CONECTORES

Completa con porque, pero, además o por eso:
1. Estudié mucho, __ aprobé.
2. Quise salir, __ llovía.',2,2,3,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(8,'Fábula y moraleja','Identifica la enseñanza de una fábula.','La fábula es una narración breve que suele presentar animales con cualidades humanas y deja una enseñanza llamada moraleja.','FICHA DE TRABAJO
FÁBULA Y MORALEJA

1. ¿Qué personajes aparecen?
2. ¿Qué error o acierto cometen?
3. Escribe la moraleja.',2,2,4,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(9,'Problemas de lógica con condiciones','Organiza datos y descarta posibilidades.','Lista las condiciones, construye un esquema y elimina las opciones que contradicen alguna regla. Comprueba cada respuesta con todos los datos.','FICHA DE TRABAJO
PROBLEMAS DE LÓGICA CON CONDICIONES

Ana, Bruno y Carla practican fútbol, vóley y ajedrez. Ana no practica fútbol. Bruno practica ajedrez. Carla no practica vóley. Determina cada deporte.',3,1,1,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(10,'Fracciones y porcentajes','Relaciona fracciones, decimales y porcentajes.','Una fracción representa partes de un todo. Un porcentaje expresa una cantidad de cada 100. Ejemplo: 1/2 = 50%.','FICHA DE TRABAJO
FRACCIONES Y PORCENTAJES

1. Convierte 1/4 a porcentaje.
2. Halla 30% de 200.
3. Una prenda de S/80 tiene 25% de descuento. ¿Cuánto se descuenta?',3,1,2,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(11,'Comprensión inferencial','Deduce información a partir de pistas del texto.','Inferir es obtener una conclusión apoyándose en pistas del texto y conocimientos previos. Toda inferencia debe tener una evidencia.','FICHA DE TRABAJO
COMPRENSIÓN INFERENCIAL

Texto: Luis salió con paraguas. Volvió con los zapatos mojados.
1. ¿Qué pudo ocurrir?
2. ¿Qué pista apoya tu respuesta?',3,2,3,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(12,'Poesía: verso, estrofa y recursos','Reconoce la estructura y recursos poéticos.','El verso es cada línea de un poema; la estrofa es un conjunto de versos. La comparación y la personificación son recursos frecuentes.','FICHA DE TRABAJO
POESÍA: VERSO, ESTROFA Y RECURSOS

1. Cuenta los versos de un poema.
2. Identifica una comparación o personificación.
3. Explica su efecto.',3,2,4,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(13,'Sucesiones y combinaciones','Analiza reglas múltiples y cuenta posibilidades.','Una sucesión puede combinar operaciones. En combinatoria básica se multiplican opciones independientes: 3 polos × 2 pantalones = 6 combinaciones.','FICHA DE TRABAJO
SUCESIONES Y COMBINACIONES

1. 2,5,11,23,__.
2. 81,27,9,__.
3. Con 4 bebidas y 3 sándwiches, ¿cuántos menús hay?',4,1,1,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(14,'Proporcionalidad y regla de tres','Resuelve relaciones proporcionales directas.','Dos magnitudes son directamente proporcionales cuando cambian en la misma razón. Usa productos cruzados y verifica las unidades.','FICHA DE TRABAJO
PROPORCIONALIDAD Y REGLA DE TRES

1. Si 3 cuadernos cuestan S/18, ¿5 cuánto cuestan?
2. Si 4 kg cuestan S/28, ¿7 kg cuánto cuestan?',4,1,2,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(15,'Analogías verbales y precisión semántica','Determina relaciones conceptuales entre palabras.','En una analogía verbal se identifica la relación exacta del primer par y se reproduce en el segundo. Ejemplo: ave:volar::pez:nadar.','FICHA DE TRABAJO
ANALOGÍAS VERBALES Y PRECISIÓN SEMÁNTICA

1. Médico:hospital::profesor:__.
2. Libro:leer::música:__.
3. Semilla:planta::huevo:__.',4,2,3,1);
INSERT INTO materiales(id_material,titulo,descripcion,contenido,ficha,id_nivel,id_area,id_subarea,creado_por) VALUES(16,'Géneros literarios y análisis','Diferencia narrativa, lírica y drama.','El género narrativo relata hechos; el lírico expresa emociones e imágenes; el dramático presenta acciones mediante diálogos para su representación.','FICHA DE TRABAJO
GÉNEROS LITERARIOS Y ANÁLISIS

1. Clasifica un cuento, un poema y una obra teatral.
2. Escribe dos rasgos de cada género.',4,2,4,1);
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(1,1,'¿Qué sigue? 2, 4, 6, 8, __','9','10','11','12','10');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(2,1,'La regla de 5,10,15,20 es...','sumar 2','sumar 5','duplicar','restar 5','sumar 5');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(3,1,'¿Qué sigue? ▲ ● ▲ ● __','▲','●','■','◆','▲');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(4,2,'7 + 5 =','10','11','12','13','12');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(5,2,'14 - 6 =','6','7','8','9','8');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(6,2,'Rosa tenía 9 panes y compró 4. Total:','5','12','13','14','13');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(7,3,'Sinónimo de feliz','triste','contento','oscuro','lento','contento');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(8,3,'Antónimo de rápido','veloz','lento','ágil','pronto','lento');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(9,3,'Par de oposición','feliz - contento','frío - caliente','casa - hogar','rápido - veloz','frío - caliente');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(10,4,'Parte donde surge el problema','inicio','nudo','desenlace','título','nudo');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(11,4,'Parte que presenta personajes y lugar','inicio','nudo','desenlace','moraleja','inicio');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(12,4,'Parte que cierra la historia','inicio','nudo','desenlace','índice','desenlace');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(13,5,'3:6::5:__','8','9','10','12','10');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(14,5,'4:12::5:__','10','12','15','20','15');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(15,5,'10:5::18:__','6','8','9','12','9');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(16,6,'7 × 6 =','36','40','42','48','42');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(17,6,'36 ÷ 4 =','8','9','10','12','9');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(18,6,'5 cajas de 8 lápices contienen','13','35','40','45','40');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(19,7,'Estudié bastante, ___ obtuve buena nota.','pero','por eso','aunque','sin embargo','por eso');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(20,7,'Quise ir, ___ estaba enfermo.','además','por eso','pero','entonces','pero');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(21,7,'No salí ___ estaba lloviendo.','porque','pero','además','por eso','porque');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(22,8,'La enseñanza de una fábula se llama','estrofa','moraleja','escena','capítulo','moraleja');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(23,8,'En muchas fábulas los animales','no participan','tienen cualidades humanas','solo describen paisajes','hablan de ciencia','tienen cualidades humanas');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(24,8,'Para hallar la moraleja observamos','solo el título','acciones y consecuencias','número de páginas','portada','acciones y consecuencias');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(25,9,'Primero conviene','adivinar','organizar las condiciones','elegir al azar','ignorar datos','organizar las condiciones');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(26,9,'Se descarta una opción cuando','es la primera','contradice una condición','parece difícil','tiene muchos datos','contradice una condición');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(27,9,'Una tabla lógica sirve para','decorar','ordenar posibilidades','sumar fracciones','escribir poemas','ordenar posibilidades');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(28,10,'1/2 equivale a','20%','25%','50%','75%','50%');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(29,10,'25% de 80 es','10','15','20','25','20');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(30,10,'75% como fracción simplificada','1/4','1/2','2/3','3/4','3/4');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(31,11,'Inferir significa','copiar literalmente','deducir a partir de pistas','inventar sin evidencia','leer solo el título','deducir a partir de pistas');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(32,11,'Una buena inferencia debe','apoyarse en evidencias','ignorar el texto','ser siempre larga','repetir una oración','apoyarse en evidencias');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(33,11,'Paraguas mojado permite inferir','probablemente llovía','era de noche','perdió su mochila','estaba en la playa','probablemente llovía');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(34,12,'Cada línea de un poema','párrafo','verso','escena','capítulo','verso');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(35,12,'Conjunto de versos','estrofa','novela','acotación','noticia','estrofa');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(36,12,'Dar acción humana al viento','hipérbole','personificación','definición','enumeración','personificación');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(37,13,'2,5,11,23,__','35','41','46','47','47');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(38,13,'81,27,9,__','1','2','3','6','3');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(39,13,'3 polos y 4 pantalones forman','7','10','12','16','12');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(40,14,'3 cuadernos cuestan S/18; 5 cuestan','S/24','S/28','S/30','S/36','S/30');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(41,14,'4 kg cuestan S/28; 1 kg cuesta','S/5','S/6','S/7','S/8','S/7');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(42,14,'60 km/h durante 5 h =','120 km','240 km','300 km','360 km','300 km');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(43,15,'Ave:volar::pez:__','caminar','nadar','leer','saltar','nadar');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(44,15,'Médico:hospital::profesor:__','mercado','escuela','estadio','taller','escuela');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(45,15,'Semilla:planta::huevo:__','piedra','animal','libro','agua','animal');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(46,16,'Género con narrador','narrativo','lírico','dramático','publicitario','narrativo');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(47,16,'Género pensado para representación','narrativo','lírico','dramático','científico','dramático');
INSERT INTO retos_evaluaciones(id_pregunta,id_material,pregunta,opcion_a,opcion_b,opcion_c,opcion_d,respuesta_correcta) VALUES(48,16,'Género que expresa emociones en versos','narrativo','lírico','dramático','periodístico','lírico');