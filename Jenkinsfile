#!/usr/bin/env groovy
pipeline {
    options {
        buildDiscarder(logRotator(daysToKeepStr: "3", numToKeepStr: "3"))
    }

    agent { label 'nodejs' }
    environment {
        NODE_PATH="${tool name: 'Node 14.17.6'}/bin"
        ARTIFACTORY_SERVER_ID= "WealthHubArtifactory"
        ARTIFACTORY_CREDENTIALS_ID= "wh_artifactory_encrypted"
    }
    parameters {
        string(
            name: 'GIT_CREDENTIALS_ID',
            defaultValue: "wh_jenkins_ssh",
            description: 'Git auth credentials')
        string(
            name: 'GIT_URL',
            defaultValue: "git@github.aus.thenational.com:Wealthhub/shaper-react-native.git",
            description: 'Source git repository')
        string(
            name: 'GIT_BRANCH',
            defaultValue: "master",
            description: 'Git branch')
    }
    stages {
        stage('Build') {
            steps {
                checkout scm
                 withEnv(["PATH+NODE=${env.NODE_PATH}"]) {
                 sshagent (credentials: ['wh_jenkins_ssh']) {
                 sh "yarn version --patch"
                }
               }
            }
        }
        stage('Deploy to Artifactory') {
            steps {
                script{

                    rtUpload (
                        serverId: 'WealthHubArtifactory',
                        spec: '''{
                            "files": [
                                {
                                "pattern": "*sdw-shaper-react-native*.tgz",
                                "target": "SDW-NPM-build/@sdw/shaper-react-native/-/@sdw/"
                                }
                            ]
                        }''',
                    )
                }
            }
          
        }

    }
    post{
        always{
            deleteDir()
        }
    }
}
