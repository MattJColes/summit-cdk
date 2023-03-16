# Summit 2023 CDK Demo

Simple CDK infrastructure which creates the following resources:

* AWS Lambda with permissions to Amazon Translate service
* AWS API Gateway connected to AWS Lambda

In the resources folder is an Lambda used to talk to Amazon Translate, as well as an example call.

## Useful commands

* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk watch`       watch for changes and compile
