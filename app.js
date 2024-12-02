const express = require('express');
const app = express();
const licitacaoRoutes = require('./src/routes/licitacoesRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', licitacaoRoutes);
app.listen(port, () => {console.log(`Server is running on ${port}`);
});