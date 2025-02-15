pipeline {
    agent any
    
    tools {
        nodejs 'Node.js'
    }
    
    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', 
                                                usernameVariable: 'GIT_USERNAME', 
                                                passwordVariable: 'GIT_PASSWORD')]) {
                    sh '''                        
                        git add dist/*
                        git commit -m "Deploy to GitHub Pages"
                        
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/USERNAME/REPO.git \
                            `git subtree split --prefix dist master`:gh-pages --force
                    '''
                }
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed!'
            // Add notification steps (email, Slack, etc.)
        }
        success {
            echo 'Successfully deployed to GitHub Pages!'
        }
    }
} 