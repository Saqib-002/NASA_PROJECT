to run in way-2 for following scipt:
"server":"npm run watch --prefix server"
run in command line: npm run server
 same for client script



    "watch":"npm run server & npm run client",
    to run both at with same command
    npm run watch
    single & allows to run command at same time not wait for first one to complete while double && allows to wait for completing first command then run second command

    single & doesn't work on windows but run-p work fine so use run p command
    "watch": "run-p server client",
    to run: npm run watch
    to run run-p command use npm i -g npm-run-all or npm install npm-run-all --save-dev