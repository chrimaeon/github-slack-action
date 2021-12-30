/*
 * Copyright (c) 2021. Christian Grach <christian.grach@cmgapps.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as core from '@actions/core'
import { ChatPostMessageResponse, WebClient } from '@slack/web-api'

enum ActionInputs {
  SLACK_TOKEN = 'slack_token',
  CHANNEL = 'channel',
  TEXT = 'text',
  BLOCKS = 'blocks',
}

async function run(): Promise<void> {
  try {
    const token = core.getInput(ActionInputs.SLACK_TOKEN, { required: true })
    const channel = core.getInput(ActionInputs.CHANNEL, { required: true })
    const text = core.getInput(ActionInputs.TEXT, { required: true })
    const blocks = core.getInput(ActionInputs.BLOCKS)

    const client = new WebClient(token)
    const response: ChatPostMessageResponse = await client.chat.postMessage({
      channel,
      text,
      blocks: blocks ? JSON.parse(blocks) : null,
    })

    console.log(response)

    if (!response.ok) {
      core.setFailed(response.error || 'error posting slack message')
    }
  } catch (e) {
    core.setFailed(e as Error)
  }
}

run()
