let fs = require('fs');

//Contadores globales (RESUMEM)
let html = 0;
let comments = 0;
let ipDir = 0;
let email = 0;
let sql = 0;
let connection = 0;
let hidden = 0;

//Función principal iteradora
async function iterador(len) {
    for(let i = 1; i <= len; i++) {
        let fileName = '0' + i + '.html';
        
        await lectorArchivos(fileName);
    } 
    resultadoFinal();   
}

//Función de procesamiento y lectura de los archivos html
async function lectorArchivos(fileName) {
    let data = await fs.readFileSync(fileName,'utf8');

    if(!data) {
        console.log("err");
    }
    else {
        //Contadores por iteración
        let comentatioHTML = 0;
        let comentarioApp = 0;
        let direccionIp = 0;
        let correoElectronico = 0;
        let sentenciasSql = 0;
        let cadenasBD = 0;
        let camposOcultos = 0;

        //Declaración de las expresiones regulares
        let HTMLTest = /<!--/;
        let appTest = /\/\/|\/\*/;
        let ipTest = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        let emailTest = /\b[\w._%+-]+@[\w.-]+\.[a-z]{2,}\b./i;
        let sqlTest = /SELECT|INSERT|UPDATE|DELETE/;
        let connTest = /\w(?=;){4}/;
        let hiddenTest = /type="hidden"/;

        //Permite dividir el texto de los documentos html en lineas
        let splitter = data.split('\r\n');

        /*Aquí es donde se hacen las comparaciones pertinentes, donde se encuentra uno de 
        los errores deseados se suma uno en los contadores, tanto globales, como en los 
        pertenecientes a la función inidvidual*/
        splitter.forEach(function(element){
            if(HTMLTest.test(element)) {
                comentatioHTML++;
                html++;
            }
            if(appTest.test(element)) {
                comentarioApp++;
                comments++;
            }
            if(ipTest.test(element)) {
                direccionIp++;
                ipDir++;
            }
            if(emailTest.test(element)) {
                correoElectronico++;
                email++;
            }
            if(sqlTest.test(element)) {
                sentenciasSql++;
                sql++;
            }
            if(connTest.test(element)) {
                cadenasBD++;
                connection++;
            }
            if(hiddenTest.test(element)) {
                camposOcultos++;
                hidden++;
            }
        }); 

        //Se mandan a imprimir los resultados de cada iteración
        console.log('\n-----' + fileName + '-----\n');
        console.log('Comentarios HTML: ' + comentatioHTML);
        console.log('Comentarios de la aplicación: ' + comentarioApp);
        console.log('Direcciones IP: ' + direccionIp);
        console.log('Direcciones de correo electrónico: ' + correoElectronico);
        console.log('Consultas SQL: ' + sentenciasSql);
        console.log('Cadenas de conexión a la base de datos: ' + cadenasBD);
        console.log('Campos ocultos de entrada:' + camposOcultos);
    } 
}

function resultadoFinal() {
    console.log('\n----- Resumen -----\n');
    console.log('Comentarios HTML: ' + html);
    console.log('Comentarios de la aplicación: ' + comments);
    console.log('Direcciones IP: ' + ipDir);
    console.log('Direcciones de correo electrónico: ' + email);
    console.log('Consultas SQL: ' + sql);
    console.log('Cadenas de conexión a la base de datos: ' + connection);
    console.log('Campos ocultos de entrada:' + hidden);
}

lectorArchivos('./01.html');
