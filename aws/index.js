const cdk = require('@aws-cdk/core')
const s3 = require('@aws-cdk/aws-s3')
const route53 = require('@aws-cdk/aws-route53')
const apigateway = require('@aws-cdk/aws-apigateway')
const secretsmanager = require('@aws-cdk/aws-secretsmanager')
const route53Targets = require('@aws-cdk/aws-route53-targets')
const certificatemanager = require('@aws-cdk/aws-certificatemanager')

const { Lambda } = require('./presets/lambda')

class AppStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const MONGO_SECRET_NAME = 'MONGO_SECRETS_MISSRONA'

    const mongoSecret = new secretsmanager.Secret(this, 'mongoSecrets', {
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

    const hostBucket = new s3.Bucket(this, 'hostBucket', {
      bucketName: 'missrona-host',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    hostBucket.grantPublicAccess('*', 's3:GetObject')

    const api = new apigateway.RestApi(this, 'missrona-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*'],
      },
    })

    // =======================================================================
    // BEGIN ROUTE53 DEFINITIONS
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      'Certificate',
      'arn:aws:acm:eu-west-1:072324662457:certificate/1f12f649-a59e-47ad-8cb0-7d4d78b0b4a4'
    )

    const domain = new apigateway.DomainName(this, 'domain', {
      certificate,
      domainName: 'missrona.sousa.cloud',
      mapping: api,
      securityPolicy: apigateway.SecurityPolicy.TLS_1_2,
    })

    // const hostedZone = route53.HostedZone.fromLookup(this, 'hostedZone', {
    //   domainName: 'missrona.sousa.cloud',
    // })

    // new route53.ARecord(this, 'AliasRecord', {
    //   zone: hostedZone,
    //   target: route53.RecordTarget.fromAlias(new route53Targets.ApiGatewayDomain(domain)),
    //   recordName: 'api',
    // })
    // END ROUTE53 DEFINITIONS
    // =======================================================================

    const feelings = api.root.addResource('feelings')

    const addFeeling = new Lambda(this, 'addFeeling', {
      mongoSecret,
      mongoSecretName: MONGO_SECRET_NAME,
      code: './aws/lambdas/feelings/add',
    })
    feelings.addMethod('POST', new apigateway.LambdaIntegration(addFeeling))

    const getFeelings = new Lambda(this, 'getFeelings', {
      mongoSecret,
      mongoSecretName: MONGO_SECRET_NAME,
      code: './aws/lambdas/feelings/get',
    })
    feelings.addMethod('GET', new apigateway.LambdaIntegration(getFeelings))
  }
}

const app = new cdk.App()

const env = { region: 'eu-west-1', account: '072324662457' }

new AppStack(app, 'missrona', { env })
