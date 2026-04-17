const MASTER_PROMPT = `
Actúa como analista de decisiones y arquitectura de procesos. Tu tarea no es decidir de forma automática, sino estructurar una recomendación razonada, clara y trazable.

Debes responder exactamente con esta estructura:

1. Resumen del problema
- Explica brevemente la situación planteada.
- Resume el contexto operativo y el objetivo de la decisión.

2. Decisión real a tomar
- Formula con precisión cuál es la decisión concreta que debe tomar la organización.

3. Datos faltantes
- Identifica la información crítica que falta.
- Señala por qué esos datos son relevantes antes de decidir.

4. Tres alternativas
- Propón exactamente tres alternativas viables.
- Deben ser realistas y distintas entre sí.

5. Comparación de alternativas
- Compara las tres alternativas usando criterios operativos, de riesgo, coste, calidad, tiempo e impacto.
- Señala ventajas, desventajas y trade-offs.

6. Recomendación razonada
- Recomienda una alternativa principal.
- Justifica por qué es la mejor opción con base en el contexto, restricciones y riesgos.

7. Automatización vs control humano
- Indica qué parte del proceso conviene automatizar.
- Indica qué parte debe quedar bajo control humano obligatorio.
- Justifica esa separación.

8. KPIs
- Propón entre 3 y 5 KPIs claros y medibles para evaluar si la solución funciona.

9. Decisión final
- Cierra con una única decisión final: GO, NO-GO o GO con condiciones.
- Explica la razón final en pocas líneas.

Reglas de respuesta:
- No inventes datos como si fueran hechos confirmados.
- Si faltan datos importantes, indícalo antes de recomendar.
- Evita respuestas genéricas.
- Prioriza claridad, trazabilidad, riesgo y criterio operativo.
- Diferencia siempre entre apoyo con IA y decisión sensible bajo supervisión humana.
`.trim();

const CASE_PROMPTS = {
  admisiones: `
Contexto específico del caso:
Caso: admisión y becas universitarias.

Objetivo del análisis:
Determinar si conviene usar IA para prevalidar solicitudes y resumir expedientes sin comprometer equidad, trazabilidad ni revisión humana en decisiones sensibles.

Debes prestar especial atención a:
- equidad y riesgo de sesgo,
- datos personales y sensibilidad documental,
- plazos de resolución,
- expedientes incompletos,
- diferencia entre automatizar comprobaciones y automatizar decisiones de admisión o beca.

Añade además un bloque final titulado:
10. Riesgo de sesgo y medidas de equidad
- Riesgos principales de sesgo.
- Medidas de mitigación.
- Controles humanos obligatorios.
`.trim(),

  "soporte-ti": `
Contexto específico del caso:
Caso: tickets internos de soporte TI.

Objetivo del análisis:
Determinar si conviene automatizar la clasificación, priorización y escalado inicial de tickets internos.

Debes prestar especial atención a:
- volumen mensual de tickets,
- tiempo de primera respuesta,
- tickets repetidos,
- prioridad y SLA,
- incidentes críticos o de alta severidad,
- diferencia entre tickets estándar y casos que solo deben ser asistidos por IA.

Añade además un bloque final titulado:
10. Primer subproceso a rediseñar
- Explica en 5 líneas cuál sería el primer subproceso que conviene rediseñar.
`.trim(),

  ecommerce: `
Contexto específico del caso:
Caso: devoluciones y fraude en e-commerce.

Objetivo del análisis:
Determinar si conviene automatizar devoluciones estándar y reservar revisión humana para fraude, excepciones y pedidos sensibles.

Debes prestar especial atención a:
- experiencia del cliente,
- riesgo de fraude,
- tiempo medio de resolución,
- valor medio del pedido,
- diferencia entre casos estándar y excepcionales,
- reglas de revisión para pedidos de alto valor.

Añade además un bloque final titulado:
10. Separación entre casos estándar y excepcionales
- Qué se automatiza.
- Qué se revisa manualmente.
- Qué regla de negocio conviene definir primero.
- Qué indicador mostraría si el proceso mejora realmente.
`.trim(),

  documentacion: `
Contexto específico del caso:
Caso: asistente interno de documentación corporativa.

Objetivo del análisis:
Determinar qué arquitectura y política de uso convienen para un asistente que consulta documentación interna sin disparar coste, latencia ni riesgo.

Debes prestar especial atención a:
- usuarios activos y volumen de consultas,
- sensibilidad documental,
- latencia máxima tolerable,
- presupuesto mensual,
- trazabilidad de respuestas,
- comparación entre SaaS/API externa, despliegue privado y opción híbrida.

Añade además un bloque final titulado:
10. Comparación de arquitectura
- SaaS/API externa.
- Despliegue privado.
- Opción híbrida.
- Cuándo elegir cada una.
- Riesgo principal.
- Coste relativo esperado.
- Efecto sobre latencia y privacidad.
`.trim()
};

const CASE_TITLES = {
  admisiones: "Admisión y becas universitarias",
  "soporte-ti": "Tickets internos de soporte TI",
  ecommerce: "Devoluciones y fraude en e-commerce",
  documentacion: "Asistente interno de documentación corporativa"
};

function normalizeText(value) {
  return String(value || "").trim();
}

function getCasePrompt(caseKey) {
  return CASE_PROMPTS[caseKey] || `
Contexto específico del caso:
Analiza el caso planteado aplicando criterio operativo, separación entre automatización y control humano, y recomendación final razonada.
`.trim();
}

function buildPrompt(caseKey, contexto, decision, datos, restricciones) {
  const safeCaseKey = normalizeText(caseKey);
  const caseTitle = CASE_TITLES[safeCaseKey] || "Caso no especificado";
  const casePrompt = getCasePrompt(safeCaseKey);

  const safeContexto = normalizeText(contexto);
  const safeDecision = normalizeText(decision);
  const safeDatos = normalizeText(datos);
  const safeRestricciones = normalizeText(restricciones);

  return `
${MASTER_PROMPT}

${casePrompt}

Datos del caso introducidos por el usuario:
- Caso seleccionado: ${caseTitle}

- Contexto:
${safeContexto || "No indicado."}

- Decisión a tomar:
${safeDecision || "No indicada."}

- Datos disponibles:
${safeDatos || "No indicados."}

- Restricciones:
${safeRestricciones || "No indicadas."}

Instrucción final:
Responde en español, con tono profesional y claro.
No te saltes apartados.
Si faltan datos relevantes, indícalos de forma explícita antes de cerrar la recomendación.
Termina siempre con una decisión final: GO, NO-GO o GO con condiciones.
`.trim();
}

window.buildPrompt = buildPrompt;
window.generatePrompt = buildPrompt;
window.createDecisionPrompt = buildPrompt;
