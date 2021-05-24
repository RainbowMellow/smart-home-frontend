pipeline {
    agent any
	triggers {
		// cron 'H * * * *'
		pollSCM 'H/3 * * * *'
	}
    stages {
		stage('Build frontend and backend in parallel') {
            steps {
			/*
				parallel(
					buildWeb: {
						sh "dotnet build src/WebUI/WebUI.csproj"
						sh "docker build ./src/WebUI -t gruppe1devops/todoit-webui"

					},
					buildApi: {
						sh "dotnet build src/API/API.csproj"
						sh "docker build ./src/API -t gruppe1devops/todoit-api"
					}
				)
			*/
			
    dir('frontend') {
		git branch: 'DevOps',
        url: 'https://github.com/RainbowMellow/smart-home-frontend/'
    }
    dir('backend') {
		git branch: 'DevOps',
        url: 'https://github.com/RainbowMellow/smart-home-backend/'
    }

    // sh('. frontend/build.sh')
    // sh('. backend/build.sh')
			
                dir('frontend') {
			sh ". frontend/npm install"
            sh ". frontend/npm run build"			
				}
			}
		}
        stage("Build database") {
            steps {
                echo "===== OPTIONAL: Will build the database (if using a state-based approach) ====="
            }
        }
        stage("Test API") {
            steps {
                sh "dotnet test test/UnitTest/UnitTest.csproj"
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
        stage("Deliver Web and Api") {
            steps {
				parallel(
					deliverWeb: {
						sh "docker push gruppe1devops/todoit-webui"
					},
					deliverApi: {
						sh "docker push gruppe1devops/todoit-api"
					}
				)
            }
        }
        stage("Release staging environment") {
            steps {
				sh "docker-compose pull"
				sh "docker-compose up flyway"
				sh "docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d frontend backend"
            }
        }
        stage("Automated acceptance test") {
            steps {
                echo "===== REQUIRED: Will use Selenium to execute automatic acceptance tests ====="
            }
        }
    }
}