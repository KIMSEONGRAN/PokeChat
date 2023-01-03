# doran-study

> 공부한 내용을 정리합니다. 왜 사용했는지, 어떤 생각을 갖고 했는 지는 README에 기록합니다.


## `2023.01.03`

### 🐋 Docker 설정

- `Dockerfile`
  : 도커 파일은 이미지를 직접 생성할 때 쓰인다.  
  여기에 쓰이는 명령어 한줄씩을 레이어 라고 부르고, 명령어에 따라 실행되는 것이 다르다.  
  https://fan-smile-44f.notion.site/docker-e7343d1c57934b9fa8c8d7e39e590db5

- `Docker compose 설정`
  : 직접 만든 이미지 파일을 써서 컨테이너 구축에 사용한다.  
  `MySQL`은 특히 utf8 설정을 하지 않으면 한글이 깨지는 현상이 발생할 수 있기에 초기 셋팅을 위해 이미지 파일을 만들었다.  
  `NestJS`는 추후 배포를 염두해 두고 서버를 띄우기 위해 컨테이너를 함께 묶어서 구동시켰다.  
  `.env`를 활용해서 민감한 정보를 git과 같은 오픈된 장소에 올리지 않기 위해 연결해서 사용하였다.

### 🚨 Error

> 환경변수를 사용하는데 어려움이 발생했다.  
> https://fan-smile-44f.notion.site/Docker-MySQL-env-9a0f368a50db4835a18b95f9e7124 > https://fan-smile-44f.notion.site/Docker-MySQL-env-9a0f368a50db4835a18b95f9e7124ee3
