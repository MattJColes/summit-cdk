import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class SummitCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const summitLambda = new lambda.Function(this, 'SummitLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('resources'),
      handler: 'summitLambda.handler'
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: summitLambda
    });

    const translateServiceAccess = new iam.PolicyStatement({
      actions: ['translate:*'],
      resources: ['*'],
    });

    summitLambda.role?.attachInlinePolicy(
      new iam.Policy(this, 'translate-service-policy', {
        statements: [translateServiceAccess],
      }),
    );
  }
}
