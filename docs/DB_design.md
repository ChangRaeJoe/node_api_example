# DB
## 종류
1. RDBMS: mysql, mssql, mariaDB, postgresSQL, sqlite
2. NosSql: mongoDB
3. inMemory: redis

## 선택
api서비스의 db로 mysql을 선택한다. mysql은 기존에 사용했으므로 러닝커브가 적고, 회원종보, 게시글을 위한
api서비스를 제공하기 위해 RDM로 서비스되어 지는게 낫다고 판단했다.

## ORM
SQL쿼리문을 작성하여 DB Server에서 값을 가져오는 방식과 ORM으로 작성하여 값을 가져오는 방식이 있다.  
ORM을 선택한다. 이유는 간단히 모델정의할 수 있고, 쿼리문 대신에 객체지향적으로 DB Server에 접근하여 
손쉽게 처리할 수 있어서다.

## 리팩토링
