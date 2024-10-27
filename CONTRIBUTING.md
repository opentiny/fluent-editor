# Contributing

We are delighted that you are interested in contributing to the Fluent Editor open-source project. There are many ways to contribute, and you can choose one or more based on your strengths and interests:

- Report [new issues](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%F0%9F%90%9B++bug&projects=&template=bug-report.yml&title=%F0%9F%90%9B+%5BBug%5D%3A+)
- Provide more detailed information for [existing issues](https://github.com/opentiny/fluent-editor/labels/bug), such as additional screenshots, detailed reproduction steps, or providing a minimal reproducible demo link
- Submit Pull requests to fix typos in the documentation or to make the documentation clearer and more comprehensive
- Add the official assistant WeChat: opentiny-official (note: Fluent Editor), join the technical discussion group

Once you have used Fluent Editor rich text and participated in several of the above forms of contributions, and have become familiar with Fluent Editor, you can try more challenging tasks, such as:

- Fixing bugs, starting with [good first issue](https://github.com/opentiny/fluent-editor/labels/good%20first%20issue)
- Implementing new features
- Improving unit tests
- Translating documentation
- Participating in code reviews

## Submitting Issues

If you encounter problems while using Fluent Editor, we welcome you to submit an Issue. Before submitting an Issue, please read the relevant [official documentation](https://opentiny.github.io/fluent-editor) to confirm whether it is a defect or a feature that has not yet been implemented.

If it is a defect, create a new Issue using the [Bug report](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%F0%9F%90%9B++bug&projects=&template=bug-report.yml&title=%F0%9F%90%9B+%5BBug%5D%3A+) template. Example title: `After setting and saving the background color of table cells in the table module, the background color is lost when rendering the cells next time`.

The Issue for reporting defects mainly requires the following information:

- The version number of `@opentiny/fluent-editor`
- The manifestation of the defect, which can be supplemented with screenshots, and if there is an error, the error message can be pasted
- The reproduction steps of the defect, preferably providing a minimal reproducible demo link

If it is a new feature, choose the [Feature request](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%E2%9C%A8+feature&projects=&template=feature-request.yml&title=%E2%9C%A8+%5BFeature%5D%3A+) template. Example title: `I hope to add the functionality of a format painter`.

The Issue for new features mainly requires the following information:

- What problem does this feature mainly solve for users
- What is the API of this feature

## Submitting PRs

Before submitting a PR, please ensure that the content you submit is in line with the overall planning of Fluent Editor. Generally, Issues already marked as [bug](https://github.com/opentiny/fluent-editor/labels/bug) encourage submitting PRs. If you are not sure, you can create a [Discussion](https://github.com/opentiny/fluent-editor/discussions) for discussion.

### Pull Request Standards

#### Commit Messages

Commit messages should be filled out in the form of `type(scope): description`, for example, `fix(table): the background color of table cells can't be saved`.

1. type: Must be one of build, chore, ci, docs, feat, fix, perf, refactor, revert, release, style, test, improvement.

2. scope:

Generally, use the module name under the `packages/fluent-editor/src` directory, such as: `table, mention, link ...`

#### Pull Request Title

1. The title standard is the same as the commit message, filled out in the form of `type(scope): description`.

2. Title examples:

- Supplementing the documentation of the mention module: `docs(mention): xxx`
- Supplementing the test cases of the mention module: `test(mention): xxx`
- Fixing defects in the mention module: `fix(mention): xxx`

#### Pull Request Description

The PR description uses a template and requires filling in the relevant PR information according to the template, mainly including:

- PR checklist: Whether the Commit message conforms to the standard, whether E2E test cases are supplemented, whether documentation is supplemented
- PR type: Defect repair, new feature, code format adjustment, refactoring, etc.
- Associated Issue number
- Whether it includes destructive changes

### Local Startup Steps

- Click the Fork button at the top right of the [Fluent Editor](https://github.com/opentiny/fluent-editor) code repository to Fork the upstream repository to your personal repository
- Clone your personal repository to the local
- Associate the upstream repository to synchronize the latest code from the upstream repository
- Run `pnpm i` in the root directory of Fluent Editor to install dependencies
- Run `pnpm dev` to start the rich text website
- Open the browser to visit: [http://localhost:5173/fluent-editor/](http://localhost:5173/fluent-editor/)

```shell
# username is the username, please replace it before execution
git clone git@github.com:username/fluent-editor.git
cd fluent-editor

# Associate the upstream repository
git remote add upstream git@github.com:opentiny/fluent-editor.git

# Install dependencies
pnpm i

# Start the local project
pnpm dev
```

### Steps for Submitting PRs

- Please ensure that you have completed the steps in the local startup and can access: [http://localhost:5173/fluent-editor/](http://localhost:5173/fluent-editor/)
- Synchronize the latest code from the upstream repository main branch: git pull upstream main
- Create a new branch from the upstream repository main branch `git checkout -b username/feature1 upstream/main`, the branch name is recommended to be `username/feat-xxx` / `username/fix-xxx`
- Local coding
- Follow the [Commit Message Format](https://www.conventionalcommits.org/zh-hans/v1.0.0/) standard for submission, PRs that do not conform to the submission standard will not be merged
- Submit to the remote repository: git push origin branchName
- Open the [Pull requests](https://github.com/opentiny/fluent-editor/pulls) link of the Fluent Editor code repository, click the New pull request button to submit PR
- Supplement the relevant information according to the PR template, including PR checklist, PR type, associated Issue number, whether it is a destructive change
- The project Committer conducts Code Review and provides feedback
- The PR author adjusts the code according to the feedback, please note that after a branch has initiated a PR, subsequent commits will be synchronized automatically, no need to resubmit PR
- The project administrator merges the PR

The contribution process ends, thank you for your contribution!

## Joining the Open Source Community

If you are interested in our open-source projects, you are welcome to join our open-source community through the following methods.

- Add the official assistant WeChat: opentiny-official (note: Fluent Editor), join our technical discussion group

If you have submitted an Issue or PR for Fluent Editor, please comment the following content under the Issue or PR to add yourself to the contributor list.

```
@all-contributors please add @<username> for <contributions>
```

For detailed rules, please refer to: [https://allcontributors.org/docs/en/bot/usage](https://allcontributors.org/docs/en/bot/usage)

We sincerely thank every developer who has contributed to the Fluent Editor open-source project! ❤
