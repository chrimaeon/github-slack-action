# GitHub Slack Message Action

[![Build & Test](https://github.com/chrimaeon/github-slack-action/actions/workflows/main.yml/badge.svg)](https://github.com/chrimaeon/github-slack-action/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/chrimaeon/github-slack-action/branch/main/graph/badge.svg?token=WNLO6DSWNC)](https://codecov.io/gh/chrimaeon/github-slack-action)

This action sends a message to a Slack channel

## Inputs

### `slack_token`:
**Required**

The OAuth token from your [Slack App]

### `channel`:
**Required**

The channel to post into

### `text`:
**Required**

The text to send

### `blocks`:

The Slack Blocks-Kit part of the message (https://api.slack.com/block-kit)

## Example usage

```yaml
name: Send Slack Message

on:
  workflow-dispatch:

jobs:
  send-message:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        uses: chrimaeon/github-slack-action@0.3.0
        with:
          slack_token: ${{ secrets.SLACK_TOKEN }}
          channel: ${{ secrets.SLACK_CHANNEL }}
          text: "The is my first message, yay!"
          blocks: |
            [
              {
                "type": "header",
                "text": {
                  "type": "plain_text",
                  "text": "Hello World!"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "from **Github Slack Action**!"
                }
              }
            ]
```

[Slack App]: https://slack.com/apps