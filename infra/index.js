const cdk = require('@aws-cdk/core')
const lambda = require('@aws-cdk/aws-lambda')
const ssm = require('@aws-cdk/aws-secretsmanager')

class AppStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const MONGO_SECRET_NAME = 'MONGO_SECRETS'

    const mongoSecrets = new ssm.Secret(this, 'mongoSecrets', {
      secretName: MONGO_SECRET_NAME,
      description: 'mongodb authentication credentials',
      generateSecretString: {
        generateStringKey: '_id',
        secretStringTemplate: JSON.stringify({
          MONGO_USERNAME: '',
          MONGO_PASSWORD: '',
          MONGO_URL: '',
        }),
      },
    })

    const addLambda = new lambda.Function(this, 'addFunction', {
      description: 'Add feelings to the database',
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset('./infra/add'),
      handler: 'index.add',
      environment: {
        MONGO_SECRET_NAME,
      },
      tracing: lambda.Tracing.ACTIVE,
      timeout: cdk.Duration.seconds(60),
    })

    mongoSecrets.grantRead(addLambda)
  }
}

const app = new cdk.App()

const env = { region: 'eu-west-1' }

new AppStack(app, 'missrona', { env })
