pipeline{
	agent any
	environment {
		ENV_FILE = credentials('taskify-next-frontend-env-file')
        AWS_ACCESS_DATA = credentials('taskify-next-frontend-aws-secret')
        AWS_REGION = credentials('taskify-next-frontend-aws-region')
        ECR_REPOSITORY = credentials('taskify-next-frontend-aws-ecr-repository-name')
        AWS_ACCOUNT_ID = credentials('taskify-next-frontend-aws-account-id')
        EKS_CLUSTER_NAME = credentials('taskify-next-frontend-aws-eks-cluster-name')
    }
    stages{
		stage('Test'){
			steps {
				sh 'docker build -t taskify-next-frontend-test -f docker/prod/app/Dockerfile.test .'
				sh 'docker run -d --name taskify-next-frontend-test-1 taskify-next-frontend-test:latest'
				sh 'docker cp "$ENV_FILE" taskify-next-frontend-test-1:/var/www/html/.env'
				sh 'docker exec -i taskify-next-frontend-test-1 npm run build'
				sh 'docker exec -i taskify-next-frontend-test-1 chown -R www-data:www-data /var/www/html'
				sh 'docker exec -i taskify-next-frontend-test-1 npm run e2e-test'
			}
			post {
				always {
					sh 'docker stop taskify-next-frontend-test-1'
                    sh 'docker rm taskify-next-frontend-test-1'
                    sh 'docker rmi taskify-next-frontend-test:latest'
                }
            }
		}
		stage('Deploy') {
			steps {
				sh 'aws configure set aws_access_key_id "$AWS_ACCESS_DATA_USR"'
                sh 'aws configure set aws_secret_access_key "$AWS_ACCESS_DATA_PSW"'
                sh 'docker build -t taskify-next-frontend -f docker/prod/app/Dockerfile .'
                sh 'aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com'
                sh 'docker tag taskify-next-frontend:latest "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/"$ECR_REPOSITORY":latest'
                sh 'aws ecr batch-delete-image --repository-name "$ECR_REPOSITORY" --image-ids imageTag=latest || true'
                sh 'docker push "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/"$ECR_REPOSITORY":latest'
                sh 'aws eks --region "$AWS_REGION" update-kubeconfig --name "$EKS_CLUSTER_NAME"'
                sh 'kubectl create secret generic taskify-laravel-back-env --from-env-file="$ENV_FILE" --dry-run=client -o yaml | kubectl apply -f -'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }
}