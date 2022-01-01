/* eslint-disable @typescript-eslint/no-explicit-any */

/*
 * Copyright (c) 2022. Christian Grach <christian.grach@cmgapps.com>
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

import { sendMessage } from './send_message'
import { ChatPostMessageResponse } from '@slack/web-api'
import Mock = jest.Mock

describe('main', () => {
  let client: any
  let postMessage: Mock

  beforeEach(() => {
    postMessage = jest.fn<ChatPostMessageResponse, void[]>(() => ({
      ok: true,
    }))
    client = {
      chat: {
        postMessage,
      },
    }
  })

  it('should send message', async () => {
    await sendMessage(client, 'channel', 'this is the text')
    expect(client.chat.postMessage).toBeCalledWith({ blocks: null, channel: 'channel', text: 'this is the text' })
  })

  it('should send message with blocks', async () => {
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'New draft release for ${{ github.repository }}',
        },
      },
    ]
    await sendMessage(
      client,
      'channel',
      'this is the text',
      JSON.stringify([
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'New draft release for ${{ github.repository }}',
          },
        },
      ]),
    )
    expect(postMessage).toBeCalledWith({ blocks: blocks, channel: 'channel', text: 'this is the text' })
  })

  it('should throw if response not ok', async () => {
    postMessage.mockResolvedValue({ ok: false })

    await expect(
      sendMessage(
        client,
        'channel',
        'this is the text',
        JSON.stringify([
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'New draft release for ${{ github.repository }}',
            },
          },
        ]),
      ),
    ).rejects.toThrow()
  })
})
