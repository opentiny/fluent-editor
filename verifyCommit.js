// Invoked on the commit-msg git hook by yorkie.
const msgPath = process.env.GIT_PARAMS || '.git/COMMIT_EDITMSG'
const msg = require('node:fs').readFileSync(msgPath, 'utf-8').trim()
const chalk = require('chalk')

const releaseRE = /^v\d/
const commitRE
  = /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`,
    )}\n\n${
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      )
    }    ${chalk.green(`feat: add 'comments' option`)}\n`
    + `    ${chalk.green(`fix: handle events on blur (close #28)`)}\n\n${
      chalk.red(`  See .github/commit-convention.md for more details.\n`)}`,
  )
  process.exit(1)
}
