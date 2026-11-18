// Conciencia Histórica - interactividad del sitio
document.addEventListener("DOMContentLoaded", function () {

  // ---------- Utilidad: mostrar mensajes visuales ----------
  function mostrar(caja, texto, tipo) {
    if (!caja) return;
    caja.textContent = texto;
    caja.className = "mensaje " + tipo;
  }

  // ---------- Menú para celular ----------
  var botonMenu = document.querySelector(".menu-boton");
  var listaMenu = document.getElementById("lista-menu");
  if (botonMenu && listaMenu) {
    botonMenu.addEventListener("click", function () {
      listaMenu.classList.toggle("abierto");
    });
  }

  // ---------- Saludo con el nombre (página de inicio) ----------
  var formNombre = document.getElementById("form-nombre");
  var saludo = document.getElementById("saludo");
  if (formNombre && saludo) {
    var campo = document.getElementById("nombre-visita");

    try {
      var guardado = localStorage.getItem("nombreVisita");
      if (guardado) {
        mostrar(saludo, "¡Hola de nuevo, " + guardado + "! Bienvenido a Conciencia Histórica.", "ok");
      }
    } catch (e) { /* el navegador no permite guardar datos */ }

    formNombre.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var nombre = campo.value.trim();

      if (nombre === "") {
        campo.classList.add("invalido");
        mostrar(saludo, "Escribe tu nombre para continuar.", "error");
        alert("Escribe tu nombre para continuar.");
        return;
      }

      campo.classList.remove("invalido");
      try { localStorage.setItem("nombreVisita", nombre); } catch (e) { /* sin guardado */ }
      mostrar(saludo, "¡Hola, " + nombre + "! Bienvenido a Conciencia Histórica.", "ok");
      alert("¡Hola, " + nombre + "! Qué bueno tenerte aquí.");
      formNombre.reset();
    });
  }

  // ---------- Quiz (página de historia) ----------
  var formQuiz = document.getElementById("form-quiz");
  if (formQuiz) {
    var respuestas = { q1: "1989", q2: "1810", q3: "carta" };
    var resultado = document.getElementById("resultado-quiz");

    formQuiz.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var correctas = 0;
      var sinResponder = false;

      Object.keys(respuestas).forEach(function (pregunta) {
        var elegida = formQuiz.querySelector('input[name="' + pregunta + '"]:checked');
        if (!elegida) {
          sinResponder = true;
        } else if (elegida.value === respuestas[pregunta]) {
          correctas++;
        }
      });

      if (sinResponder) {
        mostrar(resultado, "Responde las 3 preguntas antes de ver tu resultado.", "error");
        alert("Responde las 3 preguntas antes de ver tu resultado.");
        return;
      }

      var texto = "Obtuviste " + correctas + " de 3 respuestas correctas.";
      if (correctas === 3) texto += " ¡Excelente conciencia histórica!";
      else if (correctas === 2) texto += " ¡Muy bien, casi perfecto!";
      else texto += " Repasa la línea del tiempo e inténtalo otra vez.";

      mostrar(resultado, texto, correctas >= 2 ? "ok" : "error");
      alert(texto);
    });
  }

  // ---------- Formulario de opinión (página multimedia) ----------
  var formulario = document.getElementById("formulario");
  if (formulario) {
    var mensaje = document.getElementById("mensaje");
    var nombreOp = document.getElementById("nombre");
    var correo = document.getElementById("correo");

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var errores = [];
      nombreOp.classList.remove("invalido");
      correo.classList.remove("invalido");

      if (nombreOp.value.trim() === "") {
        errores.push("escribe tu nombre");
        nombreOp.classList.add("invalido");
      }

      var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoCorreo.test(correo.value.trim())) {
        errores.push("escribe un correo válido");
        correo.classList.add("invalido");
      }

      if (errores.length > 0) {
        var aviso = "Por favor " + errores.join(" y ") + ".";
        mostrar(mensaje, aviso, "error");
        alert(aviso);
        return;
      }

      var gracias = "¡Gracias, " + nombreOp.value.trim() + "! Tu opinión se envió correctamente.";
      mostrar(mensaje, gracias, "ok");
      alert(gracias);
      formulario.reset();
    });
  }
});
