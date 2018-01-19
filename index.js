const execa = require('execa')

async function ducklist (uri, options = {}) {
  /**
   * Run duck.sh longlist command.
   * Can list FTP, FTPS and SFTP.
   */
  const config = { retry: 3 }
  options = { ...config, ...options }

  const cmd = `duck -y --retry ${options.retry} --longlist "${uri}"`

  try {
    const result = await execa.shell(cmd)
    return parseList(result.stdout)
  } catch (err) {
    throw err
  }
}

function parseList (text) {
  /**
   * Parse duck.sh listing files.
   */
  const regex = /^(?:[drwx-]+?\t+[\w\W]+?\t+)([\w\W]+?)$/gm
  const output = []
  let matches

  while ((matches = regex.exec(text))) {
    output.push(matches[1].trim())
  }
  return output
}

module.exports = {
  ducklist,
  parseList
}
