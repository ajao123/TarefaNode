function resolverDepoisDe2Segundos(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 5000);
    });
  }
  
async function adicionar1(x) {
    var a = resolverDepoisDe2Segundos(20);
    var b = resolverDepoisDe2Segundos(30);
    return x + await a + await b;
}

adicionar1(10).then(v => {
    console.log(v);  // exibe 60 depois de 2 segundos.
});


