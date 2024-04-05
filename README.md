## 참고사이트
joshua1988.github.io/webpack-guide
캡틴판교님의 블로그 글을 보면서 공부한 웹팩실습


# webpack_study
How to use Node, NPM, yarn




# Start ##
package.json 생성
    npm init -y 

웹팩 관련 라이브러리, lodash 설치
    npm i webpack webpack-cli -D
    npm i lodash

package.json > scripts 속성에 "build": "webpack" 추가
build path 설정파일 webpack.config.js를 root 폴더에 추가


웹팩의 4가지 주요 속성
웹팩의 빌드(파일 변환) 과정을 이해하기 위해선 4가지 주요 속성에 대해 알고 있어야 한다.
1. Entry
2. Output
3. Loader
4. Plugin

# Entry

## entry 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로이다.
 
 // webpack.config.js
 module.export = {
    entry: './src/index.js'
 }

위 코드는 웹팩을 실행했을 때 src 폴더 밑의 index.js 를 대상으로 웹팩이 빌드를 수행하는 코드이다.

## Entry 파일에는 어떤 내용이 들어가야 할까?
entry 속성에 지정된 파일에는 웹 애플리케이션의 전반적인 구조와 내용이 담겨져 있어야 한다.
웹팩이 해당 파일을 갖고 웹 애플리케이션에서 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문에 애플리케이션을 동작시킬 수 있는 내용들이 담겨져 있어야 한다.

예를들어, 블로그 서비스를 웹팩으로 빌드한다고 했을 때 코드는 아래와 같을 수 있다.

// index.js
import LoginView from './LoginView.js';
import HomeView from './HomeView.js';
import PostView from './PostView.js';

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();

위 코드는 해당 서비스가 싱글 페이지 애플리케이션이라고 가정하고 작성한 코드이다.
사용자의 로그인 화면, 로그인 후 진입하는 메인 화면, 그리고 게시글을 작성하는 화면 등 웹 서비스에 필요한 화면들이 모두 index.js 파일에서 불려져 사용되고 있기 때문에 웹팩을 실행하면 해당 파일들의 내용까지 해석하여 파일을 빌드해줄 것이다.


## Entry 유형
위에서 살펴본 것처럼 엔트리 포인트는 1개가 될 수도 있지만 아래와 같이 여러개가 될 수도 있다.
entry : {
    login: './src/LoginVie.js',
    main: './src/MainView.js'
}

이렇게 엔트리 포인트를 분리하는 경우 싱글 페이지 애플리케이션이 아닌 특정 페이지로 진입했을 때 서버에서 해당 정보를 내려주는 형태의 멀티 페이지 애플리케이션에 적합하다.




# Output
output 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미한다.
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}

앞에서 배운 entry 속성과는 다르게 객체 형태로 옵션들을 추가해야 한다.

## Output 속성 옵션 형태
최소한 filename은 지정해줘야 하며 일반적으로 아래와 같이 path 속성을 함께 정의한다.
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}

여기서 filename 속성은 웹팩으로 빌드한 파일의 이름을 의미하고, path 속성은 해당 파일의 경로를 의미한다.
그리고 path 속성에서 사용된 path.resolve() 는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API 이다.

이 API의 역할을 좀 더 이해하기 쉽게 표현하면 아래와 같다.
output : './dist/bundle.js'

path 라이브러리의 자세한 사용법은 아래 사이트 참고
https://nodejs.org/api/path.html


## Output 파일 이름 옵션
앞에서 살펴본 filename 속성에 여러가지 옵션을 넣을 수 있다.

### 1. 결과 파일 이름에 entry 속성을 포함하는 옵션
module.exports = {
  output: {
    filename: '[name].bundle.js'
  }
};

### 2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션
module.exports = {
  output: {
    filename: '[id].bundle.js'
  }
};

### 3. 매 빌드시 마다 고유 해시 값을 붙이는 옵션
module.exports = {
  output: {
    filename: '[name].[hash].bundle.js'
  }
};

### 4. 웹팩의 각 모듈 내용을 기준으로 생성된 해시 값을 붙이는 옵션
module.exports = {
  output: {
    filename: '[chunkhash].bundle.js'
  }
};

이렇게 생성된 결과 파일의 이름에는 각각 엔트리 이름, 모듈 아이디, 해시 값 등이 포함된다.


# Loader
로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성이다.
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}

엔트리나 아웃풋 속성과는 다르게 module 이라는 이름을 사용한다.


## Loader가 필요한 이유
웹팩으로 애플리케이션을 빌드할 때 만약 아래와 같은 코드가 있다고 해보자.
// app.js
import './common.css';

console.log('css loaded');

/* common.css */
p {
  color: blue;
}

// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}

위 파일을 웹팩으로 빌드하게 되면 아래와 같은 에러가 발생한다.

ERROR in ./common.css 1:2
Module parse failed: Unexpected token (1:2)
You may need an appropriate loader to handle this file type, currently no loader are configured to process this file. See https://webpack.js.org/concepts#loaders
> p {
|   color: blue;
| }
 @ ./app.js 1:0-22

 위 에러메세지는 app.js 파일에서 임포트한 common.js 파일을 해석하기 위해 적절한 로더를 추가해달라는 것이다.


## CSS Loader 적용하기
이 때 해당 폴더에 아래의 NPM 명령어로 CSS 로더를 설치하고 웹팩 설정 파일 설정을 바꿔주면 에러를 해결할 수 있다.

npm i css-loader -D

// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}

위의 module 쪽 코드를 보면 rules 배열에 객체 한 쌍을 추가했다.
그리고 그 객체에는 2개의 속성이 들어가 있는데 각각 아래와 같은 역할을 한다.

test : 로더를 적용할 파일 유형(일반적으로 정규식 사용)
use : 해당 파일에 적용할 로더의 이름

정리하자면 위 코드는 해당 프로젝트의 모든 CSS파일에 대해서 CSS 로더를 적용하겠다는 의미이다.
적용 후 빌드하면 정상적으로 실행되는 것을 알 수 있다.


## 자주 사용되는 로더 종류
앞에서 살펴본 CSS 로더 이외에도 실제 서비스를 만들 때 자주 사용되는 로더의 종류는 다음과 같다.
Babel Loader - https://webpack.js.org/loaders/babel-loader/#root
Saas Loader - https://webpack.js.org/loaders/sass-loader/#root
File Loader - https://v4.webpack.js.org/loaders/file-loader/
Vue Loader - https://v4.webpack.js.org/loaders/file-loader/
TS Loader - https://webpack.js.org/guides/typescript/#loader
Style Loader - https://webpack.js.org/loaders/style-loader/#root


로더를 여러 개 사용하는 경우 아래와 같이 rules 배열에 로더 옵션을 추가해주면 됩니다.
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ]
  }
}

## 로더 적용 순서
특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야 한다.
로더는 기본적으로 오른쪽에서 왼쪽 순으로 적용된다.

아래는 CSS의 확장 문법인 SCSS 파일에 로더를 적용하는 예시이다.

module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    }
  ]
}

위 코드는 scss 파일에 대해 먼저 Sass 로더로 전처리(scss 파일을 css 파일로 변환)를 한 다음 웹팩에서 CSS 파일을 인식할 수 있게 CSS 로더를 적용하는 코드이다.

만약 웹팩으로 빌드한 자원으로 실행했을 때 해당 CSS 파일이 웹 애플리케이션에 인라인 스타일 태그로 추가되는 것을 원한다면 아래와 같이 style 로더도 추가할 수 있다.
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}

그리고, 위와 같이 배열로 입력하는 대신 아래와 같이 옵션을 포함한 형태로도 입력할 수 있다.
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { modules: true }
        },
        { loader: 'sass-loader' }
      ]
    }
  ]
}


# Plugin
플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다.
로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 된다.

플러그인은 아래와 같이 선언할 수 있다.

// webpack.config.js
module.exports = {
  plugins: []
}

플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가할 수 있다.

// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}

위의 두 플러그인은 각각 아래와 같은 역할을 한다.

HtmlWebpackPlugin : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
 - https://webpack.js.org/plugins/html-webpack-plugin/
ProgressPlugin : 웹팩의 빌드 진행율을 표시해주는 플러그인
 - https://webpack.js.org/plugins/progress-plugin/#root



## 자주 사용하는 플러그인
split-chunks-plugin - https://webpack.js.org/plugins/split-chunks-plugin/
clean-webpack-plugin - https://www.npmjs.com/package/clean-webpack-plugin
image-webpack-loader - https://github.com/tcoopman/image-webpack-loader
webpack-bundle-analyzer-plugin - https://github.com/webpack-contrib/webpack-bundle-analyzer



# WrapUp
이 외의 속성
resolve - https://webpack.js.org/configuration/resolve/#root
devServer - https://webpack.js.org/configuration/dev-server/#root
devtool - https://webpack.js.org/configuration/devtool/#devtool
