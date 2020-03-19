# Referat

https://docs.google.com/document/d/1Z-hly9i4mnkU1oQbHqkdhEf1dhhH_rRZGn_aqTWxNtA/edit


## Quarkus-Example Notes

Datasource:
```
quarkus.datasource.url=jdbc:postgresql://postgres:5432/postgres
```

DNS muss enables sein!
```
microk8s.enable dns
```

Es muss eine lokale Registry geben:
```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```
