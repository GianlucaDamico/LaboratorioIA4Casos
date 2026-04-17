document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("decision-form");
  const caseSelect = document.getElementById("case-select");
  const contextoField = document.getElementById("contexto");
  const decisionField = document.getElementById("decision");
  const datosField = document.getElementById("datos");
  const restriccionesField = document.getElementById("restricciones");
  const generateBtn = document.getElementById("generate-btn");
  const copyBtn = document.getElementById("copy-btn");
  const output = document.getElementById("output");

  const examplesPath = "data/ejemplos.json";
  let examples = {};

  const statusMessage = document.createElement("p");
  statusMessage.className = "status-message";
  statusMessage.setAttribute("aria-live", "polite");
  form.appendChild(statusMessage);

  function setStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "#b42318" : "";
  }

  function clearStatus() {
    statusMessage.textContent = "";
    statusMessage.style.color = "";
  }

  function getFormValues() {
    return {
      caso: caseSelect.value.trim(),
      contexto: contextoField.value.trim(),
      decision: decisionField.value.trim(),
      datos: datosField.value.trim(),
      restricciones: restriccionesField.value.trim(),
    };
  }

  function validateFields(values) {
    if (!values.caso) {
      return "Debes seleccionar un caso de uso.";
    }
    if (!values.contexto || !values.decision || !values.datos || !values.restricciones) {
      return "Completa contexto, decisión, datos disponibles y restricciones antes de generar el prompt.";
    }
    return "";
  }

  function getPromptBuilder() {
    if (typeof window.buildPrompt === "function") return window.buildPrompt;
    if (typeof window.generatePrompt === "function") return window.generatePrompt;
    if (typeof window.createDecisionPrompt === "function") return window.createDecisionPrompt;
    return null;
  }

  function loadCaseData(caseKey) {
    const selectedCase = examples[caseKey];
    if (!selectedCase) return;

    contextoField.value = selectedCase.contexto || "";
    decisionField.value = selectedCase.decision || "";
    datosField.value = selectedCase.datos || "";
    restriccionesField.value = selectedCase.restricciones || "";
    clearStatus();
  }

  async function loadExamples() {
    try {
      const response = await fetch(examplesPath);

      if (!response.ok) {
        throw new Error("No se pudo cargar ejemplos.json");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        examples = data.reduce((acc, item) => {
          if (item.id) acc[item.id] = item;
          return acc;
        }, {});
      } else {
        examples = data;
      }
    } catch (error) {
      console.error("Error cargando ejemplos:", error);
      setStatus("No se pudieron cargar los datos precargados. Puedes rellenar el formulario manualmente.", true);
    }
  }

  function generatePrompt() {
    clearStatus();

    const values = getFormValues();
    const validationError = validateFields(values);

    if (validationError) {
      output.textContent = "El prompt generado aparecerá aquí.";
      setStatus(validationError, true);
      return;
    }

    const buildPrompt = getPromptBuilder();

    if (!buildPrompt) {
      output.textContent = "No se ha encontrado la función de generación de prompts en prompts.js.";
      setStatus("Falta conectar correctamente prompts.js con app.js.", true);
      return;
    }

    try {
      const prompt = buildPrompt(
        values.caso,
        values.contexto,
        values.decision,
        values.datos,
        values.restricciones
      );

      output.textContent = prompt;
      setStatus("Prompt generado correctamente.");
    } catch (error) {
      console.error("Error generando prompt:", error);
      output.textContent = "Ha ocurrido un error al generar el prompt.";
      setStatus("Revisa la función de prompts.js y vuelve a intentarlo.", true);
    }
  }

  async function copyPrompt() {
    const promptText = output.textContent.trim();

    if (!promptText || promptText === "El prompt generado aparecerá aquí.") {
      setStatus("Primero debes generar un prompt antes de copiarlo.", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(promptText);
      setStatus("Prompt copiado al portapapeles.");
    } catch (error) {
      console.error("Error copiando al portapapeles:", error);
      setStatus("No se pudo copiar el prompt. Prueba a copiarlo manualmente.", true);
    }
  }

  caseSelect.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      loadCaseData(selectedValue);
    }
  });

  generateBtn.addEventListener("click", generatePrompt);
  copyBtn.addEventListener("click", copyPrompt);

  loadExamples();
});
