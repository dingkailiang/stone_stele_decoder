var shell = require('shelljs');

shell.rm("-rf", "dist")
shell.rm("-rf", "gh-pages")

shell.exec("git clone --branch gh-pages git@github.com:dingkailiang/stone_stele_decoder.git gh-pages")
shell.exec("npm run build")
shell.cp("-r","dist/.","gh-pages")
let hash = shell.exec("git rev-parse --short HEAD").trim()

shell.cd("gh-pages")
shell.exec("git add .")
shell.exec(`git commit -m "build from ${hash}"`)
shell.exec("git push")

shell.rm("-rf", "dist")
shell.rm("-rf", "gh-pages")