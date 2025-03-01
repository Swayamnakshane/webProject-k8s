pipeline{
    agent any;
    stages{
        stage("code"){
            steps {
                git url: "https://github.com/Swayamnakshane/webProject-k8s.git", branch:"master"
            }
        }
        stage("build"){
            steps {
                sh "docker build -t demoapp ."
            }
        }
        stage("deploy"){
            steps {
                sh "docker compose down && docker compose up -d"
            }
        }
    }
    post{
        success{
            emailext(
                subject: "build succesfull",
                body: "well done successfully deploy on port 3000",
                to: 'swayamvictus1803@gmail.com'
                )
        }
        failure{
            emailext(
                subject: "build succesfull",
                body: "better luch next time opps!",
                to: 'swayamvictus1803@gmail.com'
                )
        }
            
    }
}
