pipeline {
    agent any
    
    stages{
        stage('SCA with OWASP Dependency Check') {
        steps {
            dependencyCheck additionalArguments: '''--format HTML
            ''', odcInstallation: 'DP-Check'
            }
    }

        stage('Build Docker Images') {
            steps {
                script{
                    sh 'docker build -t container_playground container_playgroud/'
            }
        }
    }
        stage('Containerize And Test') {
            steps {
                script{
                    sh 'docker run -d --name container_playground -p 5000:5000 && docker logs container_playground && docker stop container_playground '
                }
            }
        }
        stage('Push Images To Dockerhub') {
            steps {
                    script{
                        withCredentials([string(credentialsId: 'DockerHubPass', variable: 'DockerHubPass')]) {
                        sh 'docker login -u rayray95 --password ${DockerHubPass}' }
                        sh 'docker push rayray95/container_playground'
               }
            }
                 
            }
        }    

        post {
        always {
                sh 'docker rm container_playground'
        }
        success {
            sh 'docker logout'   
        }
    }
}