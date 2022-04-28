import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Transaction 1',
          value: 400,
          type: 'income',
          category: 'Food',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Transaction 2',
          value: 200,
          type: 'expense',
          category: 'Food',
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => this.schema.all('transaction'));

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return data;
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
