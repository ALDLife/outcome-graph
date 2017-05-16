# Contributing

New contributions to the library are always welcome, but please follow these guidelines below

## Code

In general formatting, please follow the EditorConfig guidelines for the project. You should be only editing code `/src` folder.  

In terms of JavaScript, we are following [AirBnb guidelines for es5](https://github.com/airbnb/javascript/tree/es5-deprecated/es5). We have set up eslint to check for that so please run `npm run lint` from your command line to verify the code is passing the guidelines.  

## Building

Once the code is passing the guidelines, please run `npm run build` to generate the UMD versions of the library, bundle and the minified versions.

## Commit guidelines

Please follow the [seven rules of a greate Git commit message](https://chris.beams.io/posts/git-commit/). This means clean, consistent and understandable history. It would also be preferable that you squash your commits into one before submitting a final Pull Request, but that can also be done by us when we merge in your code.

## Bugs and Issues

Please create [issues](https://github.com/ALDLife/outcome-graph/issues) for any bugs in the code. Well structured, detailed bug reports are hugely valuable for the project.

Guidelines for reporting bugs:

- Check the issue search to see if it has already been reported
- Isolate the problem to a simple test case
- Please include steps to reproduce it. You can use the `demo` folder from this repository to set it up.

Please provide any additional details associated with the bug, if it's browser or screen density specific, or only happens with a certain configuration or data.
