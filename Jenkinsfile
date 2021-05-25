pipeline {
    agent any
	triggers {
		// cron 'H * * * *'
		pollSCM 'H/3 * * * *'
	}
    stages {
		stage('Pull frontend and backend from github') {
			steps {
				dir('frontend') { // put into own folder
					git branch: 'DevOps',
					url: 'https://github.com/RainbowMellow/smart-home-frontend/'
				}
				dir('backend') { // put into own folder
					git branch: 'DevOps',
					url: 'https://github.com/RainbowMellow/smart-home-backend/'
				}
			}
		}
		stage('Build frontend and backend in parallel') {
            steps {
				parallel(
					buildFrontend: {
						sh "npm install" // move to Dockfile?
						sh "ng build"
						sh "docker build ./frontend -t tr0els/smarthome-frontend"
					},
					buildBackend: {
						// sh "npm install"
						// sh "npm run build"
						// sh "docker build ./backend -t tr0els/smarthome-backend"
						echo "no build backend for now"
					}
				)
			}
		}
        stage("Build database") {
            steps {
                echo "===== OPTIONAL: Will build the database (if using a state-based approach) ====="
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
				withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DockerHubID', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
				{
					sh 'docker login -u ${USERNAME} -p ${PASSWORD}'	
				}
			}
		}
        stage("Deliver frontend and backend") { // deliver so it can be shared with customer/other developers
            steps {
				parallel(
					deliverFrontend: {
						sh "docker push tr0els/smarthome-frontend"
					},
					deliverBackend: {
					 	// sh "docker push tr0els/smarthome-backend"
						echo "No backend delivery for now"
					}
				)
            }
        }
        stage("Release staging environment") { // pull/download to staging/test environment
            steps {
				sh "docker-compose pull"
				// sh "docker-compose up flyway"
				// sh "docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d frontend backend"
            }
        }
        stage("Automated acceptance test") { // if this is ok we can release to prod
            steps {
                echo "===== REQUIRED: Will use Selenium to execute automatic acceptance tests ====="
            }
        }
    }
}