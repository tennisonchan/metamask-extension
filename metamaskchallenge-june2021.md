Hello! Thank you for taking the time to interview with MetaMask.

# Details

This task aims to simulate the type of work that you would do as a full time member of the MetaMask team. You will be required to get the MetaMask development environment set up locally and check out a branch on our repo. You will then be asked to fix up code on that branch and add to it.

There are both required tasks and bonus tasks. Don't worry if you don't get to any of the bonus tasks, but they are there for you if you have extra time :)

At the end, you will send us the code changes you have made. Instructions on how to do that are at bottom.

You should treat this as you would a regular work assignment, and are welcome to use whatever tools or resources you would normally use to do your work.If you have any questions while working on this challenge, as you might for a colleague, you can e-mail dan.miller@consensys.net

## Confidentiality

Please keep this challenge and your solution to yourself. If you push your solution to a remote repository, please make sure that the repository is private.

## Setup

- You can find instructions on how to build MetaMask locally here: https://github.com/MetaMask/metamask-extension#building-locally
- To set up a local development build that updates as you make changes, see this: https://github.com/MetaMask/metamask-extension#development-builds
- to add your custom build to your browser, see https://github.com/MetaMask/metamask-extension/blob/develop/docs/add-to-chrome.md or https://github.com/MetaMask/metamask-extension/blob/develop/docs/add-to-firefox.md

# Prompts

## Part 1: Required

### Background

[A simple definition of a blockchain](https://bitsonblocks.net/2015/09/09/gentle-introduction-blockchain-technology/): "a blockchain system is a package which contains a normal database plus some software that adds new rows, validates that new rows conform to pre-agreed rules, and listens and broadcasts new rows to its peers across a network, ensuring that all peers have the same data in their databases." Except, in a blockchain data isn't organized into rows, it is organized into blocks.

Blocks contain data about new transactions that are being validated on the blockchain, data necessary for understanding the state of the blockchain at the time the block was created, and data necessary for adding and validating future blocks.

### Required Task: Fixing up a new block list feature in MetaMask

One of your colleagues started working on a new feature for MetaMask that aims to show information about recent blocks on the ethereum blockchain.

The basic specifications they had to meet were:
- Add a new tab to the home screen of MetaMask
- The tab should contain a list of information about blocks that have been created since the user opened MetaMask. The information that should be shown is: block number, block hash, block nonce, block gas limit, gas used and the number of transactions in the block.
- The list should update about every 15 seconds or so
- There should be a button that allows the user to reset the block list to empty
- There should be a button that allows the user to toggle the display of number values in the block to show as decimal values (instead of the default, which is showing them as hex values). Once the button is clicked, and decimal values are displaying, the user should be able to click it again to toggle back to hex values. The properties that are number values that should be viewable in both bases are: block number, block nonce, block gas limit, and gas used. (The hash is not a number, can always be hex, and the transaction count can always be in decimal)
- Whether the user is viewing the numbers as decimal or hex values should be stored, so that if they close MetaMask / their browser and come back, the same setting as before is active.

The designs they were given shows it should look like this:
<img src="https://i.ibb.co/Gv99R26/Screenshot-from-2021-06-09-11-34-39.png" width="600" />

They started their work on a branch on our main repo called `block-list`. You can see the diff of that branch and our develop branch here: https://github.com/MetaMask/metamask-extension/compare/block-list?expand=1 (Note that we will send this to the candidates ahead of the challenge as well)

Unfortunately, another urgent task has come up and your colleague is unable to finish the block list feature. That responsibility has now fallen to you.

*What has already been completed:*

- The code to retrieve block data at an interval and make it available to the UI has been implemented.
- The UI components have been implemented
- The block list is working correctly, and blocks are getting added every ~15 seconds
- The button to reset the block list is almost fully implemented. However, there is a small bug in the related code. So your colleague has `disabled` the button for now.
- A button component for toggling the display of hex values to decimal values has been added. However, it currently does not do anything.

Reminder, you can see all the code for this here: https://github.com/MetaMask/metamask-extension/compare/block-list?expand=1

*What you need to do:*

- [x] Clean up the current code. It is definitely not production ready. Even the parts that work could use improvement. Make any additions or refactors that you think are needed. Get the code to a state that you are happy with.
- [x] Fix the "Reset Block List" button so that when clicked, the block list is emptied.
- [x] Implement all logic to get the "Display numbers as decimals" button working, and to have the hex vs decimal display setting persisted between MetaMask sessions. A couple hints on this one: we use `bignumber.js` to handle number conversions, and the properties added to the block controller state will persist between MetaMask sessions.

Get all of the above code to a place you are happy with.

### Bonus tasks

Feel free to try to complete any of the following bonus tasks if you have time:

- [x] Add the ability to delete individual block entries from the block list.
- [x] Add a dropdown sort menu, that allows the user to sort the block list by any of the number fields (block number, nonce, gas limit, gas used, transaction count)
- [x] Add a piece of data to each block: max transaction value. This should be the highest of all transaction `value`s from all transactions included in the block. Hint, the api we are using to get the block data is documented here https://infura.io/docs/ethereum/json-rpc
- [x] Have a star icon appear within any block than includes a transaction that the current user/account has sent
- [x] Ensure the block list respects the currently selected network. If you switch networks, only blocks from that network should be shown.
- [x] Get creative, make another fun feature addition or UX improvement to the block list feature
  - Would love to add airdrop feature for developer
- [x] Make any other changes or improvements to get the code production ready for MetaMask's millions of monthly users

## Submission Instructions

**(1)** If you have not already done so, commit your changes

**(2)** Bundle your git repo

```
git bundle create metamask-challenge.bundle HEAD
```
**(3)** E-mail your `metamask-challenge.bundle` file to metamask.hiring@gmail.com

------------------------------------------------

Have fun, and write some beautiful code!

Regards,

The MetaMask Team