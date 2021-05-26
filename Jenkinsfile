pipeline {
    agent any
    //parameters { 
    //    choice(name: 'NODE_VERSION', choices: ['NodeJS 14.15.5'], description: '') 
    //}
    //
    //tools {
    //    nodejs 'NodeJS 14.15.5'
    //}
	triggers {
		// cron 'H * * * *'
		pollSCM 'H/3 * * * *'
	}
    stages {
		stage('Git') {
			steps {
				parallel(
					frontend: {
						dir('frontend') {
							git branch: 'DevOps',
							url: 'https://github.com/RainbowMellow/smart-home-frontend/'
						}
					},
					backend: {
						dir('backend') {
							git branch: 'DevOps',
							url: 'https://github.com/RainbowMellow/smart-home-backend/'
						}
					}
				)
			}
		}
		stage('Build') {
            steps {
				parallel(
					frontend: {
						dir('frontend') {
							sh "npm install"
							sh "npm run build"
							sh "docker build . -t tr0els/smarthome-frontend"
						}
					},
					backend: {
						dir('backend') {
						    // sh "npm cache clean --force"
							sh "npm install"
							sh "npm run build"
							sh "docker build . -t tr0els/smarthome-backend"
						}
					}
				)
			}
		}
		stage("Login on dockerhub") {
			steps {
				withCredentials([usernamePassword(credentialsId: 'DockerHubID', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')])
				{
					sh 'docker login -u ${USERNAME} -p ${PASSWORD}'	
				}
			}
		}
        stage("Deliver to dockerhub") {
            steps {
				parallel(
					deliverFrontend: {
						sh "docker push tr0els/smarthome-frontend"
					},
					deliverBackend: {
					 	sh "docker push tr0els/smarthome-backend"
					}
				)
            }
        }
        stage("Release to test") {
            steps {
				dir('backend') {
					sh "docker-compose -p staging -f docker-compose.yml -f docker-compose.test.yml up -d"
				 }
            }
        }
        stage("Automated acceptance test") {
            steps {
                echo "===== Will use Selenium to execute automatic acceptance tests ====="
                echo "Not implemented"
            }
        }
    }
}