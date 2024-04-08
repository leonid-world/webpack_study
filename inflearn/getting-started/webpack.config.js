var path = require('path');


/**
 * package.json 의 scripts에서 한줄로 나열해야하는 설정들을 여기서
 * 더욱 가시적으로 설정할 수 있다.
 * ex)
 * webpack --mode=none 을 아래처럼
 * 
 **/
module.exports = {
    mode:'none',
    entry: './src/index.js',
    output: {
        filename : 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}