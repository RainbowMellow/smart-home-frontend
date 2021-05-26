pipeline {
    agent any
	triggers {
		// cron 'H * * * *'
		pollSCM 'H/3 * * * *'
	}
    stages {
		stage('Git') {
			steps {
				sh "docker-compose --version"
			}
        }
    }
}