# node-largger-file-regex
Busca todos os matchs de um regex em todos os arquivos de um tipo em um diretório.

# Instalação 
- Clone o repositório.
- Execute o "npm install"
- Utilize -r "regex" -f "folder"
 > -r Regex que será procurado em todos os arquivos do diretorio. Ex: "^(.*?)(5169)(.*?)(3781.jpg)(.*?)(URL)(.*?)$"
 > -f Diretorio que sofrera a varredura. Ex: "C:/temp, DEFAULT: Diretorio atual do projeto.
 > -t Tipo do arquivo que será varrido. Ex: ".txt", DEFAULT: ".log"
 
 # EXEMPLO
 node logs.js -f "C:/temp" -r "^(.*?)(5169)(.*?)(3781.jpg)(.*?)(URL)(.*?)$" -t ".txt" 
