import dva from 'dva';
import createLoading from 'dva-loading';
import createHashHistory from 'history/createHashHistory'
import './index.scss';

const app = dva({
  history: createHashHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/user').default);

// 4. Router
app.router(require('./routes').default);

// 5. Start
app.start('#root');

export default app._store;

