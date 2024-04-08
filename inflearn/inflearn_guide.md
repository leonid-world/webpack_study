# NPM 
## npm(node package manager) 이란?
전세계 자바스크립트 라이브러리가 있는 공개 저장소이다.


## npm init -y
npm package 설치
-y 는 모든것을 기본값으로 설정

## 라이브러리 설치
npm install -
ex) npm install jquery
입력 시, node_modules에 설치내역 저장


## 왜 이렇게 개발하고 관리해야할까?
html 파일 내 무분별한 <script src='...'> 라이브러리 선언 관리 (package.json에서 의존성으로 관리)


# NPM 설치 명령어
지역설치 명령어
npm install --
제거 명령어
npm uninstall --

전역설치
npm install gulp --global
전역설치는 node_modules 폴더에 설치되지 않는다.
user\%USERPROFILE%\AppData\Roaming\npm\node_modules 경로에 전역으로 저장된다.

전역설치는 프로젝트에서 사용할 라이브러리가 아닌, 시스템 레벨에서 사용할 라이브러리를 설치할 때 사용한다.

## NPM 지역설치 옵션 2가지
npm install jquery --save-prod => npm i jquery 와 똑같다.
=> package.json 의 dependencies 에 저장
npm install jquery --save-dev => npm i jquery -D 와 똑같다.
=> package.json 의 devDependencies 에 저장.

## 왜 dependencies는 2개로 나뉠까?
- dependencies와 devDependencies의 차이점 

devDependencies는 개발을 보조해주는 라이브러리가 들어간다.
ex) webpack, js-compression, sass, eslint 등


## 개발용 라이브러리와 배포용 라이브러리 구분하기
dependencies - 배포용 라이브러리
devDependencies - 개발용 라이브러리


# 웹팩이란?
모듈 번들러(Module Bundler)
모듈 번들러란, 웹앱을 구성하는 자원(HTML, JS, CSS, Image 등)을 모두 각각의 모듈로 보고 이를 조합해 병합된 하나의 결과물을 만드는 도구이다.

## 실습 #1 - 웹팩 맛보기
getting-started 폴더
npm init -y
npm i webpack webpack-cli -D
npm i lodash

build 시 mode 설정이 가장 중요!!
development , production, none 3가지가 존재.
기본적으로 none.
ex) build : webpack --mode=none








# gulp 구성




## 그래서, 모듈이란?
프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위이다.
ex)

//math.js
export function sum(a,b) {
    return a + b;
}


## 웹 개발 작업 자동화 도구

## 웹팩으로 해결할 수 있는 문제
- 자바스크립트 변수 유효 범위
- 브라우저별 HTTP요청 숫자의 제약
- 사용하지 않는 코드 관리
- Dynamic Loading & Lazy Loading 미지원



# 웹팩의 주요 속성 4가지
