import Ws from '@adonisjs/websocket-client';

import { getSocketProtocol } from '../utils/data';

export class SocketConnection {
  connect () {
    this.ws = Ws(`${getSocketProtocol()}${process.env.REACT_APP_API_URL}`)
    // .withApiToken(token)
      .connect();

    this.ws.on('open', () => {
      console.log('Connection initialized')
    });

    this.ws.on('close', () => {
      console.log('Connection closed')
    });

    return this
  }

  subscribe (channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('message', message => {
        console.log('Incoming', message);
        handler(message)
      });

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }
}

export default new SocketConnection()