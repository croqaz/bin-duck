const execa = require('execa')

async function list (uri, options = {}) {
  /**
   * Run duck.sh longlist command.
   * Can list FTP, FTPS and SFTP.
   */
  const config = { retry: 3 }
  options = { ...config, ...options }

  try {
    const result = await execa('duck', ['--nokeychain', '-yq', '-r', options.retry, '--longlist', uri])
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

async function download (uri, dest = '.', options = {}) {
  /**
   * Run duck.sh download command.
   * Denote a folder with a trailing '/'.
   */
  const config = { retry: 3, parallel: 3 }
  options = { ...config, ...options }

  // Suppress progress messages
  // Do not save passwords in keychain
  // Retry failed connection attempts
  // Use concurrent connections for transfers
  const cmd = `duck --nokeychain -yq -r ${options.retry} --parallel ${options.parallel} --download "${uri}" "${dest}"`

  try {
    const result = await execa.shell(cmd)
    return result
  } catch (err) {
    throw err
  }
}

async function upload (uri, path, options = {}) {
  /**
   * Run duck.sh upload command.
   * Uploads file or folder recursively.
   */
  const config = { retry: 3, parallel: 3 }
  options = { ...config, ...options }

  const cmd = `duck --nokeychain -yq -r ${options.retry} --parallel ${options.parallel} --upload "${uri}" "${path}"`

  try {
    const result = await execa.shell(cmd)
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  list,
  parseList,
  download,
  upload
}
