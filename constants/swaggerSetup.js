const swaggerDefinition = {
	info: {
		title: 'Vito Project',
		version: '1.0.0',
		description: 'Project for Vito pages'
	},
	host: `https://vito-backend-nodejs.herokuapp.com:${process.env.PORT}`,
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			scheme: 'bearer',
			in: 'header'
		}
	}
};

const swaggerOptions = {
	swaggerDefinition,
	apis: ['docs/*.yaml']
};

module.exports = swaggerOptions;
