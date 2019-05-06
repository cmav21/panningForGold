const readline = require('readline');

class ReadFiles {
    constructor(){
        this.files = ['01.html', '02.html','03.html','04.html','05.html','06.html'];
        this.html = 0;
        this.aplicacion = 0;
        this.ip = 0;
        this.email = 0;
        this.sql = 0;
        this.conexion = 0;
        this.ocultos = 0;
    }
    
    read(){
        let fileValues = '';
        for (let i = 0; i < this.files.length; i++) {
            let reader = readline.createInterface({input: require('fs').createReadStream(this.files[i])});;
            fileValues = this.processLineByLine(reader);
            fileValues.then(object => this.printStatistics(object, this.files[i]));
        }
        fileValues.then(object => this.printStatistics(this));
    }

    async processLineByLine(reader) {
        let html = 0, aplicacion = 0, ip = 0, email = 0, sql = 0, conexion = 0, ocultos = 0;
        let HTMLregex = /<!--/;
        let appRegex = /\/\/|\/\*/;
        let ipRegex = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        let emailRegex = /\b[\w._%+-]+@[\w.-]+\.[a-z]{2,}\b./i;
        let sqlRegex = /SELECT|INSERT|UPDATE|DELETE/;
        let conString = /\w(?=;){4}/;
        let hiddenType = /type="hidden"/
        for await (const line of reader) {
            if (HTMLregex.test(line)) {
                html++;
                this.html++;
            }
            if (appRegex.test(line)) {
                aplicacion++;
                this.aplicacion++;
            }
            if (ipRegex.test(line)) {
                ip++;
                this.ip++;
            }
            if (emailRegex.test(line)) {
                email++;
                this.email++;
            }
            if (sqlRegex.test(line)) {
                sql++;
                this.sql++;
            }
            if (conString.test(line)) {
                conexion++;
                this.conexion++;
            }
            if (hiddenType.test(line)) {
                ocultos++;
                this.ocultos++;
            }
         }
        return { "html": html, "aplicacion": aplicacion, "ip": ip, "email": email, "sql": sql, "conexion": conexion, "ocultos": ocultos};
    }

    printStatistics(data, filename = 'Resumen'){
        console.log(`${filename}\n____________________________________\nComentarios HTML: ${data['html']}
        \rComentarios de la aplicacion: ${data['aplicacion']}
        \rDirecciones IP: ${data['ip']}
        \rDirecciones de correo electronico: ${data['email']}
        \rConsultas SQL: ${data['sql']}
        \rCadenas de conexion de la base de datos: ${data['conexion']}
        \rCampos ocultos de entrada: ${data['ocultos']}\n`);
    }
}

let reader = new ReadFiles();
reader.read();

