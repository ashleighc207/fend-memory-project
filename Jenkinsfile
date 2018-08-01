pipeline {
  agent any
  stages {
    stage('Freakout') {
      steps {
        echo 'Asheligh is freaking out!'
      }
    }
    stage('Check for README.md') {
      steps {
        fileExists 'README.md'
      }
    }
    stage('bash script') {
      steps {
        sh '''echo bash script to read the read me!
cat README.md
echo goodbye
exit 0'''
      }
    }
  }
}