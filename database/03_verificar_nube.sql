SELECT DATABASE() AS base_actual;
SELECT COUNT(*) AS niveles FROM niveles;
SELECT COUNT(*) AS areas FROM areas;
SELECT COUNT(*) AS subareas FROM subareas;
SELECT COUNT(*) AS usuarios_activos FROM usuarios WHERE activo = 1;
SELECT COUNT(*) AS materiales_activos FROM materiales WHERE activo = 1;
SELECT COUNT(*) AS preguntas_activas FROM retos_evaluaciones WHERE activo = 1;
