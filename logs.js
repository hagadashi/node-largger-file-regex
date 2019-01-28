const fs = require('fs')
	, es = require('event-stream')
	, argv = require('minimist')(process.argv.slice(2));

if (argv.help) return console.log(`Utilize -r "regex" -f "folder"
 -r Regex que será procurado em todos os arquivos do diretorio. Ex: "^(.*?)(5169)(.*?)(3781.jpg)(.*?)(URL)(.*?)$"
 -f Diretorio que sofrera a varredura. Ex: "C:/temp, DEFAULT: Diretorio atual do projeto.
 -t Tipo do arquivo que será varrido. Ex: ".txt", DEFAULT: ".log"
 
 EXEMPLO: node logs.js -f "C:/temp" -r "^(.*?)(5169)(.*?)(3781.jpg)(.*?)(URL)(.*?)$" `);

const f = argv.f || __dirname;
const r = argv.r;
const t = argv.t || '.log';

if (!r) return console.log('O regex é obrigatório. Utilize --help para maiores informações');

let numeroLinha = 0;
let encontrados = [];

// console.time('Duracao');
fs.readdir(f, (err, files) => {
	files.forEach(file => {

		if (file.indexOf(t) < 0) return;
		file = f + '/' + file;

		let s = fs.createReadStream(file)
			.pipe(es.split())
			.pipe(es.mapSync(function (line) {
				++numeroLinha;

				s.pause();

				if (line.match(r)) {
					let resposta = {
						'arquivo': file,
						'linha': numeroLinha,
						'texto': line,
					}
					encontrados.push(resposta);
				};

				s.resume();
			})
				.on('error', function (err) {
					console.log('Erro durante leitura. ', err);
				})
				.on('end', function () {
					console.log(JSON.stringify({ encontrados }));
					// console.timeEnd('Duracao');
				})
			);
	});
});