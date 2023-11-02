pipeline {
	agent {
        docker {
            image 'node:18.18.2'
            args '-d -p 8443:3000 -u root'
        }
    }

	//tools {nodejs 'NodeJS'}

	environment {
        PORT = credentials('port')
        DB_URI = credentials('DB_URI')
        JWT_SECRET = credentials('JWT_SECRET')
        NODE_ENV = credentials('NODE_ENV')
        DANGEROUSLY_DISABLE_HOST_CHECK=credentials('DANGEROUSLY_DISABLE_HOST_CHECK')
        REACT_APP_API = credentials('REACT_APP_API')
    }

	stages {
		//stage('Backend Tests') {
		    //steps{
                //dir('backend-sit-forum-app-v1'){
                    //sh 'npm install'
                    //sh 'npm audit fix --force'
                    //sh 'export PORT=$PORT'
                    //sh 'export DB_URI=$DB_URI'
                    //sh 'export JWT_SECRET=$JWT_SECRET'
                    //sh 'export NODE_ENV=$NODE_ENV'
                    //sh 'npm test'
                    //junit 'backend-test-results.xml'
                //}
			//}
		//}

        stage('Testing'){
            parallel{
                stage('Start Frontend'){
                    steps{
                        sh 'cd ./frontend-sit-forum-app && npm install'
                        sh 'cd ./frontend-sit-forum-app && export DANGEROUSLY_DISABLE_HOST_CHECK=$DANGEROUSLY_DISABLE_HOST_CHECK'
                        sh 'cd ./frontend-sit-forum-app && export REACT_APP_API=$REACT_APP_API'
                        sh 'cd ./frontend-sit-forum-app && npm start'
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        sh 'sleep 120'
                        sh 'cd ./frontend-sit-forum-app && npm test'
                        junit './frontend-sit-forum-app/frontend-test-results.xml'
                    }
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
            }
        }
	}
	post {
		success {
			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		}
	}
}
