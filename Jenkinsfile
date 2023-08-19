pipeline {
    agent any
    tools{
        nodejs 'node'
    }

    parameters {
        string(name: 'DEPLOY_VERSION', defaultValue: 'latest', description: 'vendor deploy version')
    }
    stages {

       stage('checkout'){
            steps{
                lastChanges since: 'LAST_SUCCESSFUL_BUILD', format:'SIDE',matching: 'LINE'
            }
        }

        stage('build'){
            steps{
                sh "npm install -g yarn"
                sh "yarn install"
                sh "yarn build"
                sh "mv build script/"

            }
        }

           stage('harbor'){
            steps{
                sh "cd script && chmod +x build.sh && ./build.sh ${params.DEPLOY_VERSION}"


            }
        }

    }
    post {

        always{
         deleteDir()
        }
        success{
         sh "echo ${params.DEPLOY_VERSION}"
        }

    }
}
