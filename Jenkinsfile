pipeline {
    agent any
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
							sh "npm install"
							sh "npm run build"
							sh "docker build . -t tr0els/smarthome-backend"
						}
					}
				)
			}
		}
        stage("Build database") {
			steps {
				echo "===== OPTIONAL: Will build the database (if using a state-based approach) ====="
				sh "docker-compose --version"
			}
        }
		
        stage("Test API") {
            steps {
                // sh "dotnet test test/UnitTest/UnitTest.csproj"
				echo "No unit tests"
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
				dir('frontend') {
					sh "docker-compose -p staging -f docker-compose.yml -f docker-compose.test.yml up -d"
					// sh "docker-compose up"
					// sh "docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d frontend backend"
				 }
            }
        }
        stage("Automated acceptance test") { // if this is ok we can release to prod
            steps {
                echo "===== REQUIRED: Will use Selenium to execute automatic acceptance tests ====="
            }
        }
    }
}