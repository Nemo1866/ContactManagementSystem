const swaggerJs=require("swagger-jsdoc")

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Contact Management System',
            description: 'This project describes the APIs below.',
            version: '1.0.0',
            contact: {
                email: 'naeemkhan@nimapinfotech.com'
            }
        },
        servers: [
            {
                url: `http://localhost:3000`
            }
        ]
    },
    apis: ["./routes/*.js"]
    
  }

  const swaggerSpec=swaggerJs(options)

  module.exports={swaggerSpec}