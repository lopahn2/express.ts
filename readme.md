# Welcome To TypeScript Express World!

## Node.js 설정

### Node.js 설치

Node.js(https://nodejs.org/en/) 다운로드 후 설치 (윈도우 기준)

command 창에 다음 명령어들에 대한 결과가 나오면 잘 설치된 것

```
npm -v
node -v
```

### package.json 파일 생성

프로젝트 폴더 생성하고 해당 경로로 이동한 후에 다음 명령어를 입력

```
npm init -y
```

-y flag: package.json에 기본 설정 내용이 포함됨

```
{
  "name": "typescript_express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Express 설정

### Express 설치

아래 명령어로 express를 설치한다.

```
npm install express
```

## TypeScript 설정

### TypeScript 설치

아래 명령어로 typescript와 typescript 정의 파일을 설치해준다.

정의 파일(.d.ts): 모듈의 타입을 알려주기 위한 파일
정의 파일은 주로 javascript로 작성된 모듈을 사용할 때 필요

```
npm i -D typescript @types/express @types/node
```

-D flag: 라이브러리가 devDependencies로 설치됨
devDependencies는 개발할 때 필요한 라이브러리를 의미함

@types/express를 설치하면 express의 정의 파일이 설치됨

### tsconfig.json 파일 생성

터미널에 아래 명령어를 입력해서 tsconfig.json 파일을 생성한다.

```
npx tsc --init
```

tsconfig.json 파일이 아래와 같이 생성된 걸 확인할 수 있다.

```
{
"compilerOptions": {
/_ Visit <https://aka.ms/tsconfig.json> to read more about this file _/

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    					...

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    					...

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    					...
    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    					...

    /* Interop Constraints */
    					...
    	"esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    					...

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */

}
}
```

tsconfig.json 파일을 통해서 컴파일러 옵션을 설정할 수 있다.

컴파일러 옵션에 대한 자세한 내용은 Intro to the TSConfig Reference 문서에서 찾아볼 수 있다.

대표적인 옵션들에 대한 설명은 다음과 같다.

- include: 타입스크립트 파일이 있는 경로를 알려줌
- outDir: 자바스크립트 파일이 생성될 디렉토리를 지정
- target: 어떤 버전의 자바스크립트로 타입스크립트를 컴파일할 지 결정 ES6을 사용하는 게 이상적
  대부분의 nodejs와 브라우저가 ES6를 지원
- lib: 자바스크립트 코드가 어디에서 동작하는 지 알려주는 것
- DOM: 브라우저 환경을 나타냄
  lib에 포함된 내용으로 어떤 라이브러리가 사용 가능한지 알게 됨
- strict: 타입스크립트가 더 엄격하게 타입체킹

### index.ts 파일 생성

index.ts 파일을 생성하고 아래 내용을 입력해준다.

```
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
res.send('Typescript + Node.js + Express Server');
});

app.listen(port, () => {
console.log(`[server]: Server is running at <https://localhost>:${port}`);
});

```

### Nodemon, concurrently 설치

```
npm install -D concurrently nodemon
```

nodemon: 코드를 수정하면 자동으로 Node.js를 다시 실행시켜줌
concurrently: 여러가지 커맨드를 동시에 수행할 수 있게 해줌

tsc 커맨드로 타입스크립트를 컴파일하면서 nodemon으로 파일 수정을 감지
package.json 파일의 scripts에 다음 내용 추가

```
"scripts": {
"build": "npx tsc",
"start": "node index.js",
"dev": "concurrently \\"npx tsc --watch\\" \\"nodemon -q index.js\\""
}
```

아래의 명령어를 터미널에 입력해서 typescript를 javascript로 컴파일 할 수 있다.

```
npm run build
# index.js 파일이 생성된 걸 확인할 수 있다.
```

```
npm run start
# index.js 파일을 실행하고 싶다면 다음의 명령어를 터미널에 입력한다.
```

```
npm run dev
# 이를 동시에 수행하고 싶다면 다음의 명령어를 입력한다.
```
