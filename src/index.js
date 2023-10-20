import{launchBrowser,compareLayout,runTests,mkdir,mkfile,structure,stylelint,w3c,orderStyles,lang,titleEmmet,horizontalScroll}from'lib-verstka-tests';import ru from'./locales/ru.js';import{colorScheme,switchScheme,blockFullScreen,semanticTags,resetMargins,backgroundFixed}from'./tests.js';const[,,PROJECT_PATH,LANG='ru']=process.argv,app=async(a,b)=>{await runTests({projectPath:a,lang:b,resource:ru},async()=>{const c=mkdir('project',[mkfile('index.html'),mkdir('scripts',[mkfile('script.js')]),mkdir('styles',[mkfile('dark.css'),mkfile('globals.css'),mkfile('light.css'),mkfile('style.css'),mkfile('variables.css')]),mkdir('fonts',[mkfile('fonts.css')])]),d=structure(a,c);if(d.length)return d;const{browser:e,page:f}=await launchBrowser('http://localhost:3000',{viewport:{width:1024,height:768}}),g=(await Promise.all([w3c(a,'index.html'),stylelint(a),orderStyles(f,['fonts.css','globals.css']),lang(f,b),titleEmmet(f),colorScheme(f),switchScheme('http://localhost:3000'),blockFullScreen(f,'header'),blockFullScreen(f,'footer'),semanticTags(f,['header','main','section','footer','nav']),resetMargins(f,['body']),backgroundFixed(f,'.page'),horizontalScroll(f),compareLayout('http://localhost:3000',{canonicalImage:'layout-canonical-1024.jpg',pageImage:'layout-1024.jpg',outputImage:'output-1024.jpg',browserOptions:{viewport:{width:1024,height:768}}},{onBeforeScreenshot:async a=>{await a.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]),await a.evaluate(()=>window.scrollTo(0,Number.MAX_SAFE_INTEGER)),await a.waitForTimeout(2e3)}}),compareLayout('http://localhost:3000',{canonicalImage:'layout-canonical-768.jpg',pageImage:'layout-768.jpg',outputImage:'output-768.jpg',browserOptions:{viewport:{width:768,height:1024}}},{onBeforeScreenshot:async a=>{await a.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]),await a.evaluate(()=>window.scrollTo(0,Number.MAX_SAFE_INTEGER)),await a.waitForTimeout(2e3)}}),compareLayout('http://localhost:3000',{canonicalImage:'layout-canonical-375.jpg',pageImage:'layout-375.jpg',outputImage:'output-375.jpg',browserOptions:{viewport:{width:375,height:668}}},{onBeforeScreenshot:async a=>{await a.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]),await a.evaluate(()=>window.scrollTo(0,document.body.clientHeight-1336)),await a.waitForTimeout(2e3)}})])).filter(Boolean).flat();return await e.close(),g})};app(PROJECT_PATH,LANG);