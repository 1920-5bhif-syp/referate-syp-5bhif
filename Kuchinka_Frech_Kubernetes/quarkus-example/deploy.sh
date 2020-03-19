microk8s.kubectl run postgres --image=postgres:latest --port=5432 --image-pull-policy=IfNotPresent
microk8s.kubectl expose deployment postgres --type=NodePort

./mvnw clean install
docker build -f src/main/docker/Dockerfile.jvm -t author .
docker tag author:latest localhost:5000/author:latest
docker push localhost:5000/author:latest

microk8s.kubectl apply -f kubernetes.yaml