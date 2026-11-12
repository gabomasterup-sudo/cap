// ==UserScript==
// @name         Inyector Maestro - Loader Remoto
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cargador automático que descarga inyector.js desde el repositorio principal de mael-sysm.
// @author       mercz d
// @match        https://cursosabiertos.usfx.bo/materias/*/capitulos/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    if (!document.querySelector('.ejercicio')) return;

    const URL_SCRIPT_PRINCIPAL = 'https://raw.githubusercontent.com/mael-sysm/cap/main/inyector.js';

    console.log("[LOADER] Conectando con el motor principal en mael-sysm/cap...");

    fetch(URL_SCRIPT_PRINCIPAL + '?t=' + Date.now(), { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('No se pudo descargar inyector.js (Error ' + response.status + ')');
            return response.text();
        })
        .then(codigoPrincipal => {
            console.log("[LOADER] inyector.js descargado con exito. Ejecutando motor...");
            
            const scriptTag = document.createElement('script');
            scriptTag.textContent = codigoPrincipal;
            document.head.appendChild(scriptTag);
        })
        .catch(err => {
            console.error("[LOADER ERROR]:", err);
        });
})();
